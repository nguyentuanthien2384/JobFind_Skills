import db from "../models/index";
import { submitLegacyApplication } from '../utils/legacyApplication';
const { Op, col, fn, literal, where } = require("sequelize");
const { normalizeProvinceCode, provinceFilterCodes } = require('../../../microservices/shared/recruitmentCatalog.cjs');
const differentiatorService = require("./differentiatorService");

const parsePositiveInt = (value, fallback) => {
    const parsed = Number.parseInt(value, 10);
    return Number.isSafeInteger(parsed) && parsed >= 0 ? parsed : fallback;
};

const normalizeSkillText = (value) => String(value || '').trim().toLocaleLowerCase('vi');

const parseListParam = (value) => {
    if (Array.isArray(value)) return value.flatMap(parseListParam);
    if (value === undefined || value === null || value === '') return [];
    return String(value).split(',').map(item => item.trim()).filter(Boolean);
};

let getMapRequired = (data, { selectedSkillCount = 0 } = {}) => {
    let mapRequired = {}
    if (data.experienceJobCode) {
        mapRequired.experienceJobCode = data.experienceJobCode
    }
    if (data.salaryCode) {
        mapRequired.salaryJobCode = data.salaryCode
    }
    if (data.provinceCode) {
        mapRequired.addressCode = data.provinceCode
    }
    if (data.categoryJobCode) {
        mapRequired.categoryJobCode = data.categoryJobCode
    }
    for (let i = 0; i < selectedSkillCount; i++) {
        mapRequired[`skill_${i}`] = true
    }
    return mapRequired
}

let calculateMatchCv = (userSetting, userSkills, mapRequired, { skillIdMap = new Map(), otherSkillTerms = [] } = {}) => {
    const totalCriteria = Object.keys(mapRequired).length;
    const matchedCriteria = [];
    const matchedSkills = [];
    const missingSkills = [];
    let match = 0;

    if (mapRequired.experienceJobCode) {
        if (userSetting.experienceJobCode === mapRequired.experienceJobCode) {
            match++;
            matchedCriteria.push('experienceJobCode');
        }
    }
    if (mapRequired.salaryJobCode) {
        if (userSetting.salaryJobCode === mapRequired.salaryJobCode) {
            match++;
            matchedCriteria.push('salaryCode');
        }
    }
    if (mapRequired.addressCode) {
        if (normalizeProvinceCode(userSetting.addressCode) === normalizeProvinceCode(mapRequired.addressCode)) {
            match++;
            matchedCriteria.push('provinceCode');
        }
    }
    if (mapRequired.categoryJobCode) {
        if (userSetting.categoryJobCode === mapRequired.categoryJobCode) {
            match++;
            matchedCriteria.push('categoryJobCode');
        }
    }

    const candidateSkillIds = new Set(userSkills.map(item => Number(item.SkillId)).filter(Number.isSafeInteger));
    const candidateSkillNames = userSkills
        .map(item => normalizeSkillText(item.Skill?.name))
        .filter(Boolean);

    skillIdMap.forEach((label, skillId) => {
        if (candidateSkillIds.has(skillId)) {
            match++;
            matchedSkills.push(label);
        } else {
            missingSkills.push(label);
        }
    });

    otherSkillTerms.forEach(term => {
        const normalizedTerm = normalizeSkillText(term);
        if (normalizedTerm && candidateSkillNames.some(name => name.includes(normalizedTerm))) {
            match++;
            matchedSkills.push(term);
        } else if (normalizedTerm) {
            missingSkills.push(term);
        }
    });

    const matchFraction = totalCriteria > 0 ? match / totalCriteria : null;
    const matchPercentage = matchFraction !== null ? Math.round(matchFraction * 100) : null;
    return {
        matchScore: matchPercentage,
        matchLabel: matchPercentage !== null ? `${matchPercentage}%` : 'Chưa chọn tiêu chí',
        matchedCriteria,
        matchedSkills,
        missingSkills,
    };
}

const getCompanyCvAllowance = async (companyId) => {
    if (!companyId) return null;
    const company = await db.Company.findOne({
        where: { id: companyId },
        attributes: ['id', 'allowCvFree', 'allowCv', 'avgResponseHours', 'responseRate'],
        raw: true
    });
    if (!company) return null;
    return {
        companyId: company.id,
        free: Number(company.allowCvFree || 0),
        paid: Number(company.allowCv || 0),
        avgResponseHours: company.avgResponseHours ?? null,
        responseRate: company.responseRate ?? null
    };
};

// Nộp CV đồng bộ với chấm điểm tình huống Micro-Test (nếu ứng viên gửi kèm microTestAnswer)
let handleCreateCv = async (data) => {
    const res = await submitLegacyApplication(data);
    if (res && res.errCode === 0 && res.cvId && data.microTestAnswer && String(data.microTestAnswer).trim()) {
        try {
            const evalRes = await differentiatorService.evaluateSituationalAnswer({
                cvId: res.cvId,
                userId: data.userId,
                microTestAnswer: data.microTestAnswer,
                timeSpentSeconds: data.timeSpentSeconds
            });
            if (evalRes?.errCode === 0 && evalRes.data) {
                res.aiSituationalScore = evalRes.data.aiSituationalScore;
                res.aiEvaluationSummary = evalRes.data.aiEvaluationSummary;
                res.applicationStage = evalRes.data.applicationStage;
            }
        } catch (err) {
            console.error('[MicroTest Auto-Grade Warning]:', err.message);
        }
    }
    return res;
}

let getAllListCvByPost = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.postId || !data.limit || data.offset === undefined || data.offset === null || data.offset === '') {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameters !'
                })
            } else {
                let cv = await db.Cv.findAndCountAll({
                    where: { postId: data.postId },
                    limit: +data.limit,
                    offset: +data.offset,
                    order: [
                        ['aiSituationalScore', 'DESC'],
                        ['createdAt', 'DESC']
                    ],
                    nest: true,
                    raw: true,
                    include: [
                        {
                            model: db.User, as: 'userCvData', attributes: {
                                exclude: ['userId', 'file', 'companyId']
                            },
                            include: [
                                {
                                    model: db.Account, as: 'userAccountData', attributes: {
                                        exclude: ['password']
                                    }
                                }
                            ]
                        }
                    ]
                })
                resolve({
                    errCode: 0,
                    data: cv.rows,
                    count: cv.count
                })
            }
        } catch (error) {
            reject(error.message)
        }
    })
}

// Khi HR/Company mở xem chi tiết CV (roleCode !== 'CANDIDATE'), hệ thống tự động:
// 1. Đánh dấu isChecked = 1 và hrViewedAt = now
// 2. Chuyển applicationStage từ SUBMITTED / AI_SCREENED -> HR_VIEWED
// 3. Tính lại chỉ số SLA 72h của công ty (avgResponseHours, responseRate)
// 4. Phát tín hiệu Socket.IO 'cv:stage_updated' cho ứng viên theo thời gian thực
let getDetailCvById = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.cvId) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameters !'
                })
            } else {
                let dataCv = await db.Cv.findOne({
                    where: { id: data.cvId },
                    raw: false,
                    nest: true,
                    include: [
                        {
                            model: db.User, as: 'userCvData',
                            attributes: {
                                exclude: ['userId', 'file', 'companyId']
                            }
                        },
                        {
                            model: db.Post, as: 'postCvData',
                            include: [
                                {
                                    model: db.DetailPost,
                                    as: 'postDetailData',
                                    attributes: ['id', 'name', 'categoryJobCode', 'hasMicroTest', 'microTestPrompt', 'microTestTimeLimit']
                                }
                            ]
                        }
                    ]
                })
                if (dataCv) {
                    if (data.roleCode !== 'CANDIDATE') {
                        dataCv.isChecked = 1
                        await dataCv.save()
                        const currentStage = dataCv.applicationStage || 'SUBMITTED';
                        if (!dataCv.hrViewedAt || ['SUBMITTED', 'AI_SCREENED'].includes(currentStage)) {
                            const nextStage = ['SUBMITTED', 'AI_SCREENED'].includes(currentStage) ? 'HR_VIEWED' : currentStage;
                            await differentiatorService.updateCvStageWithTracker({
                                cvId: dataCv.id,
                                newStage: nextStage
                            }).catch(() => null);
                            // Reload updated stage/hrViewedAt fields
                            const refreshed = await db.Cv.findByPk(dataCv.id, { raw: true }).catch(() => null);
                            if (refreshed) {
                                dataCv.applicationStage = refreshed.applicationStage;
                                dataCv.stageUpdatedAt = refreshed.stageUpdatedAt;
                                dataCv.hrViewedAt = refreshed.hrViewedAt;
                            }
                        }
                    }
                    if (dataCv.file) {
                        dataCv.file = Buffer.from(dataCv.file, 'base64').toString('binary');
                    }
                    resolve({
                        errCode: 0,
                        data: dataCv,
                    })
                }
                else {
                    resolve({
                        errCode: 0,
                        errMessage: 'Không tìm thấy CV'
                    })
                }
            }
        } catch (error) {
            reject(error.message)
        }
    })
}

let getAllCvByUserId = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.userId || !data.limit || data.offset === undefined || data.offset === null || data.offset === '') {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameters !'
                })
            } else {
                let cv = await db.Cv.findAndCountAll({
                    where: { userId: data.userId },
                    limit: +data.limit,
                    offset: +data.offset,
                    raw: true,
                    nest: true,
                    order: [['createdAt', 'DESC']],
                    attributes: {
                        exclude: ['file']
                    },
                    include: [
                        {
                            model: db.Post, as: 'postCvData',
                            include: [
                                {
                                    model: db.DetailPost, as: 'postDetailData',
                                    attributes: [
                                        'id', 'name', 'descriptionHTML', 'descriptionMarkdown', 'amount',
                                        'hasMicroTest', 'microTestPrompt', 'microTestTimeLimit'
                                    ],
                                    include: [
                                        { model: db.Allcode, as: 'jobTypePostData', attributes: ['value', 'code'] },
                                        { model: db.Allcode, as: 'workTypePostData', attributes: ['value', 'code'] },
                                        { model: db.Allcode, as: 'salaryTypePostData', attributes: ['value', 'code'] },
                                        { model: db.Allcode, as: 'jobLevelPostData', attributes: ['value', 'code'] },
                                        { model: db.Allcode, as: 'genderPostData', attributes: ['value', 'code'] },
                                        { model: db.Allcode, as: 'provincePostData', attributes: ['value', 'code'] },
                                        { model: db.Allcode, as: 'expTypePostData', attributes: ['value', 'code'] }
                                    ]
                                },
                                {
                                    model: db.User, as: 'userPostData',
                                    attributes: ['id', 'companyId'],
                                    include: [
                                        {
                                            model: db.Company,
                                            as: 'userCompanyData',
                                            attributes: ['id', 'name', 'thumbnail', 'avgResponseHours', 'responseRate']
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                })
                resolve({
                    errCode: 0,
                    data: cv.rows,
                    count: cv.count
                })
            }
        } catch (error) {
            reject(error.message)
        }
    })
}

let getStatisticalCv = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.fromDate || !data.toDate || !data.limit || data.offset === undefined || data.offset === null || data.offset === '') {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameters !'
                })
            } else {
                let filterListPost = {
                    limit: +data.limit,
                    offset: +data.offset,
                    include: [
                        {
                            model: db.DetailPost, as: 'postDetailData', attributes: ['id', 'name']
                        },
                        {
                            model: db.User, as: 'userPostData', attributes: ['id', 'firstName', 'lastName'],
                            include: [
                                { model: db.Account, as: 'userAccountData', attributes: ['id', 'userId'] }
                            ]
                        }
                    ],
                    raw: true,
                    nest: true,
                }
                if (data.companyId) {
                    let listUserOfCompany = await db.User.findAll({
                        where: { companyId: data.companyId },
                        attributes: ['id']
                    })
                    listUserOfCompany = listUserOfCompany.map(item => ({ userId: item.id }))
                    filterListPost.where = {
                        ...filterListPost.where,
                        [Op.and]: [{ [Op.or]: listUserOfCompany }]
                    }
                }
                let listPost = await db.Post.findAndCountAll(filterListPost)
                let listPostId = listPost.rows.map(item => ({ postId: item.id }))
                let startDate = new Date(data.fromDate)
                let endDate = new Date(data.toDate)
                endDate.setDate(endDate.getDate() + 1)

                let listCv = await db.Cv.findAll({
                    where: {
                        createdAt: { [Op.and]: [{ [Op.gte]: startDate }, { [Op.lt]: endDate }] },
                        [Op.and]: [{ [Op.or]: listPostId }]
                    },
                    attributes: ['postId', [db.sequelize.fn('COUNT', db.sequelize.col('postId')), 'total']],
                    group: ['postId'],
                    raw: true,
                    nest: true
                })
                for (let i = 0; i < listPost.rows.length; i++) {
                    listPost.rows[i].total = 0
                    for (let j = 0; j < listCv.length; j++) {
                        if (listPost.rows[i].id === listCv[j].postId) {
                            listPost.rows[i].total = listCv[j].total
                        }
                    }
                }
                resolve({
                    errCode: 0,
                    data: listPost.rows,
                    count: listPost.count
                })
            }
        }
        catch (error) {
            reject(error)
        }
    })
}

let fillterCVBySelection = async (data = {}, companyId = null) => {
    if (data.limit === undefined || data.offset === undefined || data.offset === null || data.offset === '') {
        return { errCode: 1, errMessage: 'Missing required parameters !' };
    }
    const limit = Math.min(parsePositiveInt(data.limit, 10) || 10, 50);
    const offset = parsePositiveInt(data.offset, 0);
    const minMatch = Math.min(parsePositiveInt(data.minMatch, 0), 100);
    const skillMode = ['any', 'all', 'rank'].includes(data.skillMode) ? data.skillMode : 'any';
    const sort = ['match', 'name'].includes(data.sort) ? data.sort : 'match';
    const keyword = String(data.keyword || '').trim().slice(0, 120);
    const skillIds = [...new Set(parseListParam(data.listSkills).map(Number).filter(id => Number.isSafeInteger(id) && id > 0))].slice(0, 30);
    const otherSkillTerms = [...new Set(parseListParam(data.otherSkills).map(item => item.slice(0, 80)).filter(Boolean))].slice(0, 20);

    const settingWhere = {
        isFindJob: 1,
        file: { [Op.ne]: null },
        [Op.and]: [where(fn('OCTET_LENGTH', col('UserSetting.file')), { [Op.gt]: 0 })],
    };
    if (data.categoryJobCode) settingWhere.categoryJobCode = String(data.categoryJobCode).trim();
    if (data.experienceJobCode) settingWhere.experienceJobCode = String(data.experienceJobCode).trim();
    if (data.salaryCode) settingWhere.salaryJobCode = String(data.salaryCode).trim();
    if (data.provinceCode) {
        const provinceCodes = provinceFilterCodes(String(data.provinceCode).trim());
        settingWhere.addressCode = provinceCodes.length > 1 ? { [Op.in]: provinceCodes } : String(data.provinceCode).trim();
    }

    const listUserSetting = await db.UserSetting.findAll({
        where: settingWhere,
        include: [
            {
                model: db.User,
                as: 'userSettingData',
                attributes: ['id', 'firstName', 'lastName', 'address', 'image'],
                required: true,
                include: [{
                    model: db.Account,
                    as: 'userAccountData',
                    attributes: [],
                    where: { roleCode: 'CANDIDATE', statusCode: 'S1' },
                    required: true,
                }],
            },
            { model: db.Allcode, as: 'jobTypeSettingData', attributes: ['code', 'value'] },
            { model: db.Allcode, as: 'expTypeSettingData', attributes: ['code', 'value'] },
            { model: db.Allcode, as: 'salaryTypeSettingData', attributes: ['code', 'value'] },
            { model: db.Allcode, as: 'provinceSettingData', attributes: ['code', 'value'] },
        ],
        attributes: { exclude: ['file'] },
        raw: true,
        nest: true,
    });

    // Chặn công ty hiện tại trong blockedCompanyIds của ứng viên (Blind Profile Protection)
    const requesterCompanyId = companyId ? Number(companyId) : null;
    const filteredSettings = listUserSetting.filter(item => {
        const blocked = differentiatorService.parseBlockedIds(item.blockedCompanyIds);
        if (requesterCompanyId && blocked.includes(requesterCompanyId)) {
            return false;
        }
        return true;
    });

    const userIds = filteredSettings.map(item => item.userId).filter(Boolean);
    const [skillCatalog, listUserSkill] = await Promise.all([
        skillIds.length
            ? db.Skill.findAll({ where: { id: { [Op.in]: skillIds } }, attributes: ['id', 'name'], raw: true })
            : [],
        userIds.length
            ? db.UserSkill.findAll({
                where: { UserId: { [Op.in]: userIds } },
                include: [{ model: db.Skill, attributes: ['id', 'name', 'categoryJobCode'] }],
                raw: true,
                nest: true,
            })
            : [],
    ]);

    const skillIdMap = new Map(skillIds.map(id => [id, `#${id}`]));
    skillCatalog.forEach(skill => skillIdMap.set(Number(skill.id), skill.name));

    const skillsByUser = new Map();
    listUserSkill.forEach(row => {
        const userId = Number(row.UserId);
        if (!skillsByUser.has(userId)) skillsByUser.set(userId, []);
        skillsByUser.get(userId).push(row);
    });

    let unlockedMap = new Map();
    if (companyId && userIds.length > 0 && db.CandidateView) {
        const views = await db.CandidateView.findAll({
            where: {
                companyId,
                candidateId: { [Op.in]: userIds }
            },
            attributes: ['candidateId', 'allowanceType', 'updatedAt'],
            raw: true
        });
        views.forEach(v => {
            unlockedMap.set(Number(v.candidateId), v);
        });
    }

    const selectedSkillCount = skillIdMap.size + otherSkillTerms.length;
    const mapRequired = getMapRequired(data, { selectedSkillCount });
    const hasScoringCriteria = Object.keys(mapRequired).length > 0;
    const normalizedKeyword = normalizeSkillText(keyword);

    const matched = filteredSettings.map(item => {
        const userSkills = skillsByUser.get(Number(item.userId)) || [];
        const score = calculateMatchCv(item, userSkills, mapRequired, { skillIdMap, otherSkillTerms });
        const fullName = [item.userSettingData?.firstName, item.userSettingData?.lastName].filter(Boolean).join(' ');
        const searchable = normalizeSkillText([
            fullName,
            item.userSettingData?.address,
            item.jobTypeSettingData?.value,
            item.provinceSettingData?.value,
            ...userSkills.map(skill => skill.Skill?.name),
        ].filter(Boolean).join(' '));

        if (normalizedKeyword && !searchable.includes(normalizedKeyword)) return null;
        if (selectedSkillCount > 0 && skillMode === 'any' && score.matchedSkills.length === 0) return null;
        if (selectedSkillCount > 0 && skillMode === 'all' && score.matchedSkills.length < selectedSkillCount) return null;
        if (hasScoringCriteria && score.matchScore < minMatch) return null;

        const unlockRecord = unlockedMap.get(Number(item.userId)) || null;
        const isUnlocked = Boolean(unlockRecord);
        const isBlindProfile = Boolean(item.isBlindProfile);

        // Nếu ứng viên bật Hồ sơ Ẩn danh (Blind Profile) và công ty chưa mở khóa 2 chiều,
        // che tên thật & ảnh đại diện nhưng giữ nguyên kỹ năng đã xác thực và mức lương kỳ vọng
        const displayUserSettingData = (isBlindProfile && !isUnlocked)
            ? {
                ...item.userSettingData,
                firstName: 'Ứng viên Ẩn danh',
                lastName: `#${item.userId}`,
                image: null
            }
            : item.userSettingData;

        return {
            ...item,
            userSettingData: displayUserSettingData,
            file: null,
            hasCv: true,
            isUnlocked,
            unlockedAllowanceType: unlockRecord?.allowanceType || null,
            isBlindProfile,
            minExpectedSalary: Number(item.minExpectedSalary || 0),
            skills: userSkills
                .filter(skill => skill.Skill?.id)
                .map(skill => ({
                    id: skill.Skill.id,
                    name: skill.Skill.name,
                    categoryJobCode: skill.Skill.categoryJobCode,
                    isVerified: Boolean(skill.isVerified),
                    verificationSource: skill.verificationSource || 'SELF_DECLARED'
                })),
            ...score,
        };
    }).filter(Boolean);

    matched.sort((a, b) => {
        if (sort === 'name') {
            const nameA = [a.userSettingData?.firstName, a.userSettingData?.lastName].filter(Boolean).join(' ');
            const nameB = [b.userSettingData?.firstName, b.userSettingData?.lastName].filter(Boolean).join(' ');
            return nameA.localeCompare(nameB, 'vi');
        }
        return (b.matchScore ?? -1) - (a.matchScore ?? -1)
            || b.matchedSkills.length - a.matchedSkills.length
            || Number(a.userId) - Number(b.userId);
    });

    return {
        errCode: 0,
        data: matched.slice(offset, offset + limit),
        count: matched.length,
        allowance: await getCompanyCvAllowance(companyId),
    };
};

const listCandidateSearchJobs = async (data = {}, companyId = null) => {
    if (!companyId) return { errCode: 2, errMessage: 'Không tìm thấy công ty người dùng sở hữu', httpStatus: 403 };
    const limit = Math.min(parsePositiveInt(data.limit, 20) || 20, 50);
    const offset = parsePositiveInt(data.offset, 0);
    const search = String(data.search || '').trim().slice(0, 120);

    const companyUsers = await db.User.findAll({ where: { companyId }, attributes: ['id'], raw: true });
    const ownerIds = companyUsers.map(user => user.id);
    if (!ownerIds.length) return { errCode: 0, data: [], count: 0 };

    const detailWhere = search ? { name: { [Op.like]: `%${search}%` } } : undefined;
    const posts = await db.Post.findAndCountAll({
        where: { userId: { [Op.in]: ownerIds }, statusCode: { [Op.ne]: 'PS4' } },
        limit,
        offset,
        order: [['updatedAt', 'DESC'], ['id', 'DESC']],
        include: [{
            model: db.DetailPost,
            as: 'postDetailData',
            required: Boolean(detailWhere),
            where: detailWhere,
            attributes: [
                'id', 'name', 'categoryJobCode', 'addressCode', 'salaryJobCode',
                'experienceJobCode', 'categoryJoblevelCode', 'categoryWorktypeCode',
                'hasMicroTest', 'microTestPrompt', 'microTestTimeLimit'
            ],
            include: [
                { model: db.Allcode, as: 'jobTypePostData', attributes: ['code', 'value'] },
                { model: db.Allcode, as: 'provincePostData', attributes: ['code', 'value'] },
                { model: db.Allcode, as: 'salaryTypePostData', attributes: ['code', 'value'] },
                { model: db.Allcode, as: 'expTypePostData', attributes: ['code', 'value'] },
            ],
        }],
        raw: true,
        nest: true,
    });

    const categoryCodes = [...new Set(posts.rows.map(row => row.postDetailData?.categoryJobCode).filter(Boolean))];
    const categorySkills = categoryCodes.length
        ? await db.Skill.findAll({
            where: { categoryJobCode: { [Op.in]: categoryCodes } },
            attributes: ['id', 'name', 'categoryJobCode'],
            order: [['name', 'ASC']],
            raw: true,
        })
        : [];
    const skillsByCategory = new Map();
    categorySkills.forEach(skill => {
        if (!skillsByCategory.has(skill.categoryJobCode)) skillsByCategory.set(skill.categoryJobCode, []);
        skillsByCategory.get(skill.categoryJobCode).push({ id: skill.id, name: skill.name });
    });

    return {
        errCode: 0,
        count: posts.count,
        data: posts.rows.map(post => {
            const detail = post.postDetailData || {};
            const suggestedSkills = skillsByCategory.get(detail.categoryJobCode) || [];
            return {
                id: post.id,
                statusCode: post.statusCode,
                timeEnd: post.timeEnd,
                updatedAt: post.updatedAt,
                name: detail.name || `Tin #${post.id}`,
                hasMicroTest: Boolean(detail.hasMicroTest),
                criteria: {
                    categoryJobCode: detail.categoryJobCode || '',
                    provinceCode: detail.addressCode || '',
                    salaryCode: detail.salaryJobCode || '',
                    experienceJobCode: detail.experienceJobCode || '',
                    listSkills: suggestedSkills,
                },
                labels: {
                    category: detail.jobTypePostData?.value || detail.categoryJobCode || '',
                    province: detail.provincePostData?.value || detail.addressCode || '',
                    salary: detail.salaryTypePostData?.value || detail.salaryJobCode || '',
                    experience: detail.expTypePostData?.value || detail.experienceJobCode || '',
                },
            };
        }),
    };
};

let checkSeeCandiate = async (data) => {
    const companyId = Number(data.companyId);
    const candidateId = Number(data.candidateId);
    if (!Number.isSafeInteger(companyId) || companyId <= 0) {
        return { errCode: 1, errMessage: 'Missing required parameters !' };
    }
    if (!Number.isSafeInteger(candidateId) || candidateId <= 0) {
        return { errCode: 2, errMessage: 'Thiếu thông tin ứng viên cần xem' };
    }

    return db.sequelize.transaction(async (transaction) => {
        const company = await db.Company.findOne({
            where: { id: companyId },
            attributes: ['id', 'allowCvFree', 'allowCv'],
            transaction,
            lock: transaction.LOCK.UPDATE,
            raw: false,
        });
        if (!company) {
            return { errCode: 2, errMessage: 'Không tìm thấy công ty người dùng sở hữu' };
        }

        const candidateSetting = await db.UserSetting.findOne({
            where: {
                userId: candidateId,
                isFindJob: 1,
                file: { [Op.ne]: null },
                [Op.and]: [where(fn('OCTET_LENGTH', col('UserSetting.file')), { [Op.gt]: 0 })],
            },
            include: [{
                model: db.User,
                as: 'userSettingData',
                attributes: ['id'],
                required: true,
                include: [{
                    model: db.Account,
                    as: 'userAccountData',
                    attributes: [],
                    where: { roleCode: 'CANDIDATE', statusCode: 'S1' },
                    required: true,
                }],
            }],
            attributes: ['id', 'userId'],
            transaction,
            raw: true,
        });
        if (!candidateSetting) {
            return { errCode: 4, errMessage: 'Hồ sơ ứng viên không khả dụng hoặc đã tắt tìm việc' };
        }

        const existingGrant = await db.CandidateView.findOne({
            where: { companyId, candidateId },
            transaction,
            lock: transaction.LOCK.UPDATE,
        });
        if (existingGrant) {
            return {
                errCode: 0,
                errMessage: 'Ok',
                alreadyGranted: true,
                chargedAllowance: null,
                existingAllowanceType: existingGrant.allowanceType || 'FREE',
                allowance: {
                    free: Number(company.allowCvFree || 0),
                    paid: Number(company.allowCv || 0),
                },
            };
        }

        let allowanceType = null;
        if (company.allowCvFree > 0) {
            company.allowCvFree -= 1;
            allowanceType = 'FREE';
        } else if (company.allowCv > 0) {
            company.allowCv -= 1;
            allowanceType = 'PAID';
        } else {
            return {
                errCode: 1,
                errMessage: 'Công ty bạn đã hết lượt xem hãy mua thêm lượt xem',
                allowance: { free: 0, paid: 0 },
            };
        }

        await company.save({ transaction });
        await db.CandidateView.create({ companyId, candidateId, allowanceType }, { transaction });
        return {
            errCode: 0,
            errMessage: 'Ok',
            alreadyGranted: false,
            chargedAllowance: allowanceType,
            allowance: {
                free: Number(company.allowCvFree || 0),
                paid: Number(company.allowCv || 0),
            },
        };
    });
};

module.exports = {
    handleCreateCv: handleCreateCv,
    getAllListCvByPost: getAllListCvByPost,
    getDetailCvById: getDetailCvById,
    getAllCvByUserId: getAllCvByUserId,
    getStatisticalCv: getStatisticalCv,
    fillterCVBySelection: fillterCVBySelection,
    listCandidateSearchJobs,
    checkSeeCandiate: checkSeeCandiate
}
