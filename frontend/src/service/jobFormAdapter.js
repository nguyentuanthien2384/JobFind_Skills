// One explicit mapping for flat Job Core data and nested legacy Sequelize data.
// Raw codes take precedence, including null: a missing Allcode join must not
// silently replace a stored code with the first option in a dropdown.
export const JOB_CLASSIFICATIONS = Object.freeze([
    ['categoryJobCode', 'categoryJobCode', 'jobTypePostData', 'JOBTYPE'],
    ['addressCode', 'addressCode', 'provincePostData', 'PROVINCE'],
    ['salaryJobCode', 'salaryJobCode', 'salaryTypePostData', 'SALARYTYPE'],
    ['categoryJoblevelCode', 'categoryJoblevelCode', 'jobLevelPostData', 'JOBLEVEL'],
    ['categoryWorktypeCode', 'categoryWorktypeCode', 'workTypePostData', 'WORKTYPE'],
    ['experienceJobCode', 'experienceJobCode', 'expTypePostData', 'EXPTYPE'],
    ['genderCode', 'genderPostCode', 'genderPostData', 'GENDERPOST']
].map(Object.freeze));
const own = (object, field) => Object.prototype.hasOwnProperty.call(object, field);
const strings = ['name', 'descriptionHTML', 'descriptionMarkdown'];
export const isJobRevision = value => typeof value === 'string' && /^jv1-[a-f0-9]{64}$/.test(value);

export const jobDeadlineDate = value => {
    if (!['string', 'number'].includes(typeof value) || !/^[1-9][0-9]*$/.test(String(value))) return null;
    const time = Number(value);
    return Number.isSafeInteger(time) && time <= 8640000000000000 ? new Date(time) : null;
};

const hotFlag = value => {
    if ([0, '0', false, undefined, null].includes(value)) return 0;
    if ([1, '1', true].includes(value)) return 1;
    throw new Error('Loại tin tuyển dụng không hợp lệ');
};

export const jobToForm = job => {
    if (!job || typeof job !== 'object' || !['string', 'number'].includes(typeof job.id) || !/^[1-9][0-9]*$/.test(String(job.id))
        || !Number.isSafeInteger(Number(job.id))) throw new Error('Không đọc được dữ liệu tin tuyển dụng');
    const detail = own(job, 'postDetailData') ? job.postDetailData : job;
    if (!detail || typeof detail !== 'object' || typeof detail.name !== 'string') {
        throw new Error('Không đọc được nội dung tin tuyển dụng');
    }
    return {
        ...Object.fromEntries(strings.map(field => [field, typeof detail[field] === 'string' ? detail[field] : ''])),
        ...Object.fromEntries(JOB_CLASSIFICATIONS.map(([form, raw, relation]) => {
            const value = own(detail, raw) ? detail[raw] : detail[relation]?.code;
            return [form, typeof value === 'string' ? value : ''];
        })),
        amount: detail.amount == null ? '' : String(detail.amount),
        hasMicroTest: detail.hasMicroTest ? 1 : 0,
        microTestPrompt: typeof detail.microTestPrompt === 'string' ? detail.microTestPrompt : '',
        microTestTimeLimit: Number(detail.microTestTimeLimit) > 0 ? Number(detail.microTestTimeLimit) : 180,
        timeEnd: job.timeEnd ?? '', id: job.id, isHot: hotFlag(job.isHot),
        statusCode: job.statusCode ?? job.statusPostData?.code ?? null, isActionADD: false,
        editRevision: isJobRevision(job.editRevision) ? job.editRevision : null
    };
};

export const jobClassificationOptions = (items, current) => {
    const options = (Array.isArray(items) ? items : []).filter(item => typeof item?.code === 'string' && item.code);
    const distinct = [...new Map(options.map(item => [item.code, { code: item.code, value: item.value || item.code }])).values()];
    if (distinct.some(item => item.code === current)) return distinct;
    return [{ code: current || '', value: current ? `Mã đang lưu: ${current} (không có trong danh mục)` : 'Chưa chọn' }, ...distinct];
};

const statusLabels = Object.freeze({
    PS1: 'Đã duyệt', PS2: 'Bị từ chối', PS3: 'Chờ kiểm duyệt', PS4: 'Đã gỡ hoặc bị chặn'
});
export const jobStatusLabel = code => own(statusLabels, code) ? statusLabels[code] : 'Chưa xác định';

const formDetail = form => ({
    ...Object.fromEntries(strings.map(field => [field, form[field] ?? ''])),
    ...Object.fromEntries(JOB_CLASSIFICATIONS.map(([field, raw]) => [raw, form[field] === '' || form[field] == null ? null : form[field]])),
    amount: form.amount,
    hasMicroTest: form.hasMicroTest ? 1 : 0,
    microTestPrompt: form.microTestPrompt ? String(form.microTestPrompt).trim() : null,
    microTestTimeLimit: Number(form.microTestTimeLimit) > 0 ? Number(form.microTestTimeLimit) : 180
});

const validateField = (field, value) => {
    if (field === 'amount') {
        if (!['string', 'number'].includes(typeof value) || !/^(100000|[1-9][0-9]{0,4})$/.test(String(value))) {
            throw new Error('Số lượng nhân viên phải là số nguyên từ 1 đến 100000');
        }
        return Number(value);
    }
    if (field === 'hasMicroTest') return value ? 1 : 0;
    if (field === 'microTestPrompt') return value ? String(value).slice(0, 5000) : null;
    if (field === 'microTestTimeLimit') return Number(value) > 0 ? Number(value) : 180;
    const required = ['name', 'descriptionHTML', 'categoryJobCode'].includes(field);
    const max = field === 'name' ? 255 : field.startsWith('description') ? 200000 : 64;
    if ((required && (typeof value !== 'string' || !value.trim()))
        || (value !== null && typeof value !== 'string') || (typeof value === 'string' && value.length > max)
        || (field === 'descriptionMarkdown' && value === null)) {
        throw new Error(`Thông tin ${field} không hợp lệ`);
    }
    return value;
};

export const buildJobCreate = (form, deadline = form.timeEnd) => {
    const timeEnd = deadline instanceof Date ? String(deadline.getTime()) : String(deadline);
    if (!jobDeadlineDate(timeEnd) || Number(timeEnd) <= Date.now()) throw new Error('Ngày kết thúc phải hơn ngày hiện tại');
    return Object.freeze({
        ...Object.fromEntries(Object.entries(formDetail(form)).map(([field, value]) => [field, validateField(field, value)])),
        timeEnd, isHot: hotFlag(form.isHot)
    });
};

export const buildJobUpdate = (form, initial) => {
    if (!initial || !['string', 'number'].includes(typeof initial.id) || !/^[1-9][0-9]*$/.test(String(initial.id))
        || !Number.isSafeInteger(Number(initial.id)) || String(form.id) !== String(initial.id)) throw new Error('Cần tải lại tin trước khi sửa');
    if (String(form.timeEnd) !== String(initial.timeEnd) || hotFlag(form.isHot) !== hotFlag(initial.isHot)) {
        throw new Error('Không thể đổi ngày hết hạn hoặc loại tin khi sửa');
    }
    const next = formDetail(form), previous = formDetail(initial);
    const changes = Object.entries(next).filter(([field, value]) => field === 'amount'
        ? String(value) !== String(previous[field]) : value !== previous[field]);
    if (!changes.length) return null;
    if (!isJobRevision(initial.editRevision)) throw new Error('Cần tải lại phiên bản tin trước khi sửa');
    return Object.freeze({ ...Object.fromEntries(changes.map(([field, value]) => [field, validateField(field, value)])),
        expectedRevision: initial.editRevision });
};
