import db from "../models/index";
const differentiatorService = require("./differentiatorService");

// Tạo hoặc cập nhật đánh giá công ty (mỗi user 1 đánh giá / 1 công ty),
// đồng thời tự động kiểm tra lịch sử ứng tuyển/phỏng vấn tại bảng Cvs để gắn huy hiệu xác thực:
// INTERVIEWED_CANDIDATE | APPLICANT | PUBLIC
let handleCreateReview = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.userId || !data.companyId || !data.star || !data.content) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameters !'
                })
            } else {
                let star = Number(data.star)
                if (star < 1 || star > 5) {
                    resolve({
                        errCode: 2,
                        errMessage: 'Số sao phải từ 1 đến 5'
                    })
                    return
                }

                const interviewRating = Number(data.interviewExperienceRating || star);
                const { verificationType, relatedCvId } = await differentiatorService.resolveReviewVerification(
                    data.userId,
                    data.companyId,
                    data.relatedCvId
                );

                let existing = await db.CompanyReview.findOne({
                    where: {
                        userId: data.userId,
                        companyId: data.companyId
                    },
                    raw: false
                })

                if (existing) {
                    existing.star = star
                    existing.content = data.content
                    existing.interviewExperienceRating = interviewRating
                    existing.verificationType = verificationType
                    existing.relatedCvId = relatedCvId
                    await existing.save()
                    resolve({
                        errCode: 0,
                        errMessage: 'Đã cập nhật đánh giá công ty kèm trạng thái xác thực',
                        data: existing
                    })
                } else {
                    const created = await db.CompanyReview.create({
                        userId: data.userId,
                        companyId: data.companyId,
                        star: star,
                        content: data.content,
                        interviewExperienceRating: interviewRating,
                        verificationType,
                        relatedCvId
                    })
                    resolve({
                        errCode: 0,
                        errMessage: 'Đánh giá công ty thành công',
                        data: created
                    })
                }
            }
        } catch (error) {
            reject(error)
        }
    })
}

// Lấy danh sách đánh giá theo công ty + tính điểm trung bình + trả về huy hiệu xác thực & SLA
let getReviewByCompany = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.companyId) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameters !'
                })
            } else {
                let filter = {
                    where: { companyId: data.companyId },
                    order: [['createdAt', 'DESC']],
                    include: [
                        {
                            model: db.User,
                            as: 'userReviewData',
                            attributes: ['id', 'firstName', 'lastName', 'image']
                        }
                    ],
                    raw: true,
                    nest: true
                }
                if (data.limit && data.offset !== undefined) {
                    filter.limit = +data.limit
                    filter.offset = +data.offset
                }
                let res = await db.CompanyReview.findAndCountAll(filter)

                let allReviews = await db.CompanyReview.findAll({
                    where: { companyId: data.companyId },
                    attributes: ['star', 'interviewExperienceRating', 'verificationType'],
                    raw: true
                })
                let avgStar = 0
                let avgInterviewRating = 0
                if (allReviews.length > 0) {
                    let sum = allReviews.reduce((acc, item) => acc + item.star, 0)
                    avgStar = Math.round((sum / allReviews.length) * 10) / 10
                    let interviewSum = allReviews.reduce(
                        (acc, item) => acc + Number(item.interviewExperienceRating || item.star || 5),
                        0
                    )
                    avgInterviewRating = Math.round((interviewSum / allReviews.length) * 10) / 10
                }

                resolve({
                    errCode: 0,
                    data: res.rows,
                    count: res.count,
                    averageStar: avgStar,
                    averageInterviewRating: avgInterviewRating
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}

let handleDeleteReview = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id || !data.userId) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameters !'
                })
            } else {
                let review = await db.CompanyReview.findOne({
                    where: { id: data.id },
                    raw: false
                })
                if (!review) {
                    resolve({
                        errCode: 2,
                        errMessage: 'Không tìm thấy đánh giá'
                    })
                } else {
                    let account = await db.Account.findOne({
                        where: { userId: data.userId }
                    })
                    if (review.userId === +data.userId || (account && account.roleCode === 'ADMIN')) {
                        await db.CompanyReview.destroy({
                            where: { id: data.id }
                        })
                        resolve({
                            errCode: 0,
                            errMessage: 'Đã xóa đánh giá'
                        })
                    } else {
                        resolve({
                            errCode: 3,
                            errMessage: 'Bạn không có quyền xóa đánh giá này'
                        })
                    }
                }
            }
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    handleCreateReview: handleCreateReview,
    getReviewByCompany: getReviewByCompany,
    handleDeleteReview: handleDeleteReview
}
