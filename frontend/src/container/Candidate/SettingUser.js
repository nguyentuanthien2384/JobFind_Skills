import React from 'react'
import { useEffect, useRef, useState } from 'react';
import { getDetailUserById, UpdateUserSettingService, getAllSkillByJobCode } from '../../service/userService';
import { useFetchAllcode } from '../../util/fetch';
import { toast } from 'react-toastify';
import 'react-image-lightbox/style.css';
import CommonUtils from '../../util/CommonUtils';
import { Select } from 'antd'
import PdfPreviewButton from '../../components/documents/PdfPreviewButton';
const SettingUser = () => {
    const [listSkills, setListSkills] = useState([])
    const [fileName, setFileName] = useState('CV.pdf');
    const fileVersion = useRef(0);
    const [inputValues, setInputValues] = useState({
        jobType: '',
        salary: '',
        skills: [],
        jobProvince: '',
        exp: '',
        isFindJob: 0,
        isTakeMail: 0,
        file: '',
        isBlindProfile: 0,
        minExpectedSalary: '',
        blockedCompanyIdsText: ''
    });
    let handleOnChangeFile = async (event) => {
        const version = ++fileVersion.current;
        let data = event.target.files;
        let file = data[0];
        if (file) {
            if (!/\.pdf$/i.test(file.name) || !file.size) {
                toast.error('Hãy chọn tệp CV định dạng PDF.');
                return;
            }
            if (file.size > 2097152) {
                toast.error("File của bạn quá lớn. Chỉ gửi file dưới 2MB")
                return
            }
            try {
                let base64 = await CommonUtils.getBase64(file);
                if (version !== fileVersion.current) return;
                setInputValues(currentValues => ({ ...currentValues, file: base64 }));
                setFileName(file.name);
            } catch {
                if (version === fileVersion.current) toast.error('Không đọc được tệp CV. Hãy chọn lại tệp.');
            }
        }
    }

    const handleChange = async (value, detail) => {
        if (Array.isArray(detail)) {
            setInputValues({
                ...inputValues,
                skills: value
            })
        }
        else {
            if (detail.type === 'jobType') {
                let res = await getAllSkillByJobCode(value)
                let listSkills = res.data.map(item => ({
                    value: item.id,
                    label: item.name
                }))
                setListSkills(listSkills)
                setInputValues({
                    ...inputValues,
                    [detail.type]: value,
                    skills: []
                })
            }
            else {
                setInputValues({
                    ...inputValues,
                    [detail.type]: value,
                })
            }
        }
    };
    useEffect(() => {
        const getListSkill = async (jobType) => {
            const res = await getAllSkillByJobCode(jobType)
            const skills = (res?.data || []).map(item => ({
                value: item.id,
                label: item.name
            }))
            setListSkills(skills)
        }

        const setStateUser = (data) => {
            const setting = data?.userAccountData?.userSettingData || {};
            getListSkill(setting.categoryJobCode)
            const skills = Array.isArray(data.listSkills)
                ? data.listSkills.map(item => item.SkillId)
                : []
            let blockedText = '';
            if (setting.blockedCompanyIds) {
                try {
                    const parsed = JSON.parse(setting.blockedCompanyIds);
                    blockedText = Array.isArray(parsed) ? parsed.join(', ') : String(setting.blockedCompanyIds);
                } catch {
                    blockedText = String(setting.blockedCompanyIds);
                }
            }
            setInputValues((currentValues) => ({
                ...currentValues,
                jobType: setting.categoryJobCode ?? '',
                salary: setting.salaryJobCode ?? '',
                skills,
                jobProvince: setting.addressCode ?? '',
                exp: setting.experienceJobCode ?? '',
                isFindJob: setting.isFindJob ?? 0,
                isTakeMail: setting.isTakeMail ?? 0,
                file: setting.file ?? '',
                isBlindProfile: setting.isBlindProfile ? 1 : 0,
                minExpectedSalary: setting.minExpectedSalary != null ? String(setting.minExpectedSalary) : '',
                blockedCompanyIdsText: blockedText
            }))
        }

        const userData = JSON.parse(localStorage.getItem('userData'));
        if (userData) {
            let fetchUser = async () => {
                let user = await getDetailUserById(userData.id)
                if (user && user.errCode === 0) {
                    setStateUser(user.data)
                }
            }
            fetchUser()
        }
        return () => { fileVersion.current += 1; };
    }, [])

    let { data: dataProvince } = useFetchAllcode('PROVINCE');
    let { data: dataExp } = useFetchAllcode('EXPTYPE')
    let { data: dataSalary } = useFetchAllcode('SALARYTYPE')
    let { data: dataJobType } = useFetchAllcode('JOBTYPE')


    dataProvince = dataProvince.map(item => ({
        value: item.code,
        label: item.value,
        type: 'jobProvince'
    }))

    dataExp = dataExp.map(item => ({
        value: item.code,
        label: item.value,
        type: 'exp'
    }))

    dataSalary = dataSalary.map(item => ({
        value: item.code,
        label: item.value,
        type: 'salary'
    }))

    dataJobType = dataJobType.map(item => ({
        value: item.code,
        label: item.value,
        type: 'jobType'
    }))

    let handleOnChangeCheckBox = (e) => {
        const { name, checked } = e.target
        if (name === 'isFindJob' && !inputValues.file) {
            toast.error('Bạn cần đăng tải CV trước khi chọn tính năng này')
        } else if (name === 'isTakeMail' && !inputValues.jobType && !inputValues.jobProvince) {
            toast.error('Bạn cần chọn lĩnh vực và khu vực làm việc trước khi chọn tính năng này')
        }
        else {
            setInputValues({
                ...inputValues,
                [name]: checked ? 1 : 0
            })
        }
    }

    let handleSaveUser = async () => {
        const userData = JSON.parse(localStorage.getItem('userData'));
        const blockedCompanyIds = String(inputValues.blockedCompanyIdsText || '')
            .split(/[,;\s]+/)
            .map(item => Number(item.trim()))
            .filter(num => Number.isFinite(num) && num > 0);

        let settingData = {
            categoryJobCode: inputValues.jobType,
            addressCode: inputValues.jobProvince,
            experienceJobCode: inputValues.exp,
            isTakeMail: inputValues.isTakeMail,
            isFindJob: inputValues.isFindJob,
            file: inputValues.file,
            salaryJobCode: inputValues.salary,
            listSkills: inputValues.skills,
            isBlindProfile: inputValues.isBlindProfile ? 1 : 0,
            minExpectedSalary: inputValues.minExpectedSalary !== '' ? Number(inputValues.minExpectedSalary) : null,
            blockedCompanyIds
        }
        let res = await UpdateUserSettingService({
            id: userData.id,
            data: settingData
        })
        if (res && res.errCode === 0) {
            toast.success("Cập nhật người dùng thành công")
            window.location.reload()
        } else {
            toast.error(res.errMessage)
        }
    }
    return (
        <div className=''>
            <div className="col-12 grid-margin">
                <div className="card">
                    <div className="card-body">
                        <h4 className="card-title">Cài đặt thông tin nâng cao</h4>
                        <form className="form-sample">

                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group row">
                                        <label className="col-sm-3 col-form-label">Lĩnh vực</label>
                                        <div className="col-sm-9">
                                            <Select
                                                style={{
                                                    width: '100%',
                                                }}
                                                placeholder="Chọn lĩnh vực"
                                                onChange={handleChange}
                                                options={dataJobType}
                                                value={inputValues.jobType}
                                                filterOption={(input, option) =>
                                                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                                }
                                                showSearch
                                            >
                                            </Select>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group row">
                                        <label className="col-sm-3 col-form-label">Mức lương</label>
                                        <div className="col-sm-9">
                                            <Select
                                                style={{
                                                    width: '100%',
                                                }}
                                                placeholder="Chọn mức lương"
                                                onChange={handleChange}
                                                options={dataSalary}
                                                value={inputValues.salary}
                                                filterOption={(input, option) =>
                                                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                                }
                                                showSearch
                                            >
                                            </Select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-md-12'>
                                    <div className="form-group row">
                                        <label className="col-sm-3 col-form-label">Kĩ năng</label>
                                        <div className="col-sm-9">
                                            <Select
                                                disabled={!inputValues.jobType}
                                                mode="multiple"
                                                style={{
                                                    width: '100%',
                                                }}
                                                placeholder="Chọn kĩ năng của bạn"
                                                onChange={handleChange}
                                                options={listSkills}
                                                value={inputValues.skills}
                                                filterOption={(input, option) =>
                                                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                                }
                                                showSearch
                                            >
                                            </Select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group row">
                                        <label className="col-sm-3 col-form-label">Khu vực làm việc</label>
                                        <div className="col-sm-9">
                                            <Select
                                                style={{
                                                    width: '100%',
                                                }}
                                                placeholder="Chọn nơi làm việc"
                                                onChange={handleChange}
                                                options={dataProvince}
                                                value={inputValues.jobProvince}
                                                filterOption={(input, option) =>
                                                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                                }
                                                showSearch
                                            >
                                            </Select>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group row">
                                        <label className="col-sm-3 col-form-label">Kinh nghiệm làm việc</label>
                                        <div className="col-sm-9">
                                            <Select
                                                style={{
                                                    width: '100%',
                                                }}
                                                placeholder="Chọn khoảng kinh nghiệm"
                                                onChange={handleChange}
                                                options={dataExp}
                                                value={inputValues.exp}
                                                filterOption={(input, option) =>
                                                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                                }
                                                showSearch
                                            >
                                            </Select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group row">
                                        <label className="col-sm-3 col-form-label">Bật tìm việc</label>
                                        <div className="col-sm-9">
                                            <input aria-label="Bật tìm việc" name="isFindJob" onChange={handleOnChangeCheckBox} checked={inputValues.isFindJob} type="checkbox"></input>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='row'>
                                <div className="col-md-6">
                                    <div className="form-group row">
                                        <label className="col-sm-3 col-form-label">Nhận mail công việc</label>
                                        <div className="col-sm-9">
                                            <input aria-label="Nhận mail công việc" name="isTakeMail" onChange={handleOnChangeCheckBox} checked={inputValues.isTakeMail} type="checkbox"></input>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Chế độ Hồ sơ Ẩn danh & Săn đầu người Offer-First (Blind Profile & Reverse Bidding) */}
                            <div className="card mb-4 mt-2" style={{ border: '1px solid #c7d2fe', background: '#f8fafc' }}>
                                <div className="card-body">
                                    <h5 className="mb-2" style={{ color: '#312e81', fontWeight: 700 }}>
                                        🕶️ Chế độ Hồ sơ Ẩn danh & Đấu giá Lương Ngược (Offer-First Bidding)
                                    </h5>
                                    <p className="text-muted mb-3" style={{ fontSize: '13px' }}>
                                        Khi bật <b>Hồ sơ Ẩn danh</b>, nhà tuyển dụng trên sàn săn đầu người sẽ chỉ thấy kỹ năng (kèm huy hiệu đã xác thực) và kinh nghiệm của bạn mà không thấy Họ tên, SĐT, Email. Thông tin chỉ mở khóa 2 chiều khi bạn bấm chấp nhận lời mời có mức lương đạt kỳ vọng.
                                    </p>
                                    <div className="row">
                                        <div className="col-md-4 mb-2">
                                            <label className="d-flex align-items-center" style={{ gap: '8px', fontWeight: 600, cursor: 'pointer' }}>
                                                <input
                                                    type="checkbox"
                                                    name="isBlindProfile"
                                                    checked={Boolean(inputValues.isBlindProfile)}
                                                    onChange={handleOnChangeCheckBox}
                                                />
                                                Bật Hồ sơ Ẩn danh (Blind Profile)
                                            </label>
                                        </div>
                                        <div className="col-md-4 mb-2">
                                            <label className="form-label" style={{ fontSize: '12px', fontWeight: 600 }}>
                                                Mức lương sàn tối thiểu để nhận Offer-First (VNĐ)
                                            </label>
                                            <input
                                                type="number"
                                                min="0"
                                                step="500000"
                                                className="form-control"
                                                placeholder="VD: 15000000"
                                                value={inputValues.minExpectedSalary}
                                                onChange={e => setInputValues({ ...inputValues, minExpectedSalary: e.target.value })}
                                            />
                                        </div>
                                        <div className="col-md-4 mb-2">
                                            <label className="form-label" style={{ fontSize: '12px', fontWeight: 600 }}>
                                                Chặn ID Công ty hiện tại (cách nhau bằng dấu phẩy)
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="VD: 1, 5"
                                                value={inputValues.blockedCompanyIdsText}
                                                onChange={e => setInputValues({ ...inputValues, blockedCompanyIdsText: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group row">
                                        <label className="col-sm-3 col-form-label">CV gửi lên</label>
                                        <div className="col-sm-9">
                                            <input aria-label="Tải CV" onChange={(event) => handleOnChangeFile(event)} accept='.pdf' type="file" className="form-control form-file" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {
                                inputValues.file &&
                                <div className="col-md-12">
                                    <div className="form-group row">

                                        <PdfPreviewButton source={inputValues.file} fileName={fileName} label="Xem trước CV" />
                                    </div>
                                </div>
                            }

                            <button type="button" onClick={() => handleSaveUser()} className="btn1 btn1-primary1 btn1-icon-text">
                                <i className="ti-file btn1-icon-prepend"></i>
                                Lưu
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SettingUser
