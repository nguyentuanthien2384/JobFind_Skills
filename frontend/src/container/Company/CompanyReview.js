import React from "react";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { formatJobTime } from '../../util/jobLocale';
import {
    getReviewByCompanyService,
    createCompanyReviewService,
    deleteCompanyReviewService,
} from "../../service/userService";
import { hasPermission, PERMISSIONS } from '../../auth/accessControl';
import { readJsonStorage } from '../../util/storage';

const VERIFICATION_BADGES = {
    INTERVIEWED_CANDIDATE: {
        label: "✓ Ứng viên đã phỏng vấn thực tế",
        bg: "#dcfce7",
        color: "#166534",
        border: "#86efac"
    },
    APPLICANT: {
        label: "✓ Ứng viên đã nộp CV",
        bg: "#dbeafe",
        color: "#1e40af",
        border: "#93c5fd"
    },
    PUBLIC: {
        label: "Đánh giá cộng đồng",
        bg: "#f1f5f9",
        color: "#475569",
        border: "#cbd5e1"
    }
};

const CompanyReview = (props) => {
    const navigate = useNavigate();
    const companyId = props.companyId;
    const [listReview, setListReview] = useState([]);
    const [count, setCount] = useState(0);
    const [averageStar, setAverageStar] = useState(0);
    const [star, setStar] = useState(5);
    const [interviewExperienceRating, setInterviewExperienceRating] = useState(5);
    const [content, setContent] = useState("");
    const userData = readJsonStorage("userData");
    const canSocialInteract = !userData || hasPermission(userData, PERMISSIONS.SOCIAL_INTERACT);

    const fetchReview = useCallback(async () => {
        let res = await getReviewByCompanyService({
            companyId: companyId,
            limit: 20,
            offset: 0,
        });
        if (res && res.errCode === 0) {
            setListReview(res.data);
            setCount(res.count);
            setAverageStar(res.averageStar);
        }
    }, [companyId]);

    useEffect(() => {
        if (companyId) {
            fetchReview();
        }
    }, [companyId, fetchReview]);

    const handleSubmitReview = async () => {
        if (!userData) {
            toast.error("Xin hãy đăng nhập để có thể đánh giá công ty");
            setTimeout(() => {
                localStorage.setItem("lastUrl", window.location.href);
                navigate("/login");
            }, 1000);
            return;
        }
        if (!hasPermission(userData, PERMISSIONS.SOCIAL_INTERACT)) {
            toast.error("Chỉ ứng viên mới có thể đánh giá công ty");
            return;
        }
        if (!content) {
            toast.error("Vui lòng nhập nội dung đánh giá");
            return;
        }
        let res = await createCompanyReviewService({
            userId: userData.id,
            companyId: companyId,
            star: star,
            interviewExperienceRating: interviewExperienceRating,
            content: content,
        });
        if (res && res.errCode === 0) {
            toast.success(res.errMessage);
            setContent("");
            fetchReview();
        } else {
            toast.error(res && res.errMessage ? res.errMessage : "Có lỗi xảy ra");
        }
    };

    const handleDeleteReview = async (reviewId) => {
        if (!userData) return;
        let res = await deleteCompanyReviewService({
            id: reviewId,
            userId: userData.id,
        });
        if (res && res.errCode === 0) {
            toast.success(res.errMessage);
            fetchReview();
        } else {
            toast.error(res && res.errMessage ? res.errMessage : "Có lỗi xảy ra");
        }
    };

    const renderStars = (value) => {
        let stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <i
                    key={i}
                    className={i <= value ? "fas fa-star" : "far fa-star"}
                    style={{ color: "#f5b301", marginRight: "2px" }}
                ></i>
            );
        }
        return stars;
    };

    return (
        <div className="company-info box-white" style={{ marginTop: "20px" }}>
            <h4 className="title">Đánh giá công ty & Trải nghiệm Phỏng vấn Thực tế (Verified Reviews)</h4>
            <div className="box-body">
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        marginBottom: "20px",
                    }}
                >
                    <span
                        style={{
                            fontSize: "32px",
                            fontWeight: "bold",
                            color: "#f5b301",
                        }}
                    >
                        {averageStar}
                    </span>
                    <div>
                        <div>{renderStars(Math.round(averageStar))}</div>
                        <div style={{ fontSize: "13px", color: "#666" }}>
                            {count} lượt đánh giá (Hệ thống tự động đối chiếu lịch sử nộp CV & phỏng vấn để gắn nhãn xác thực)
                        </div>
                    </div>
                </div>

                {/* Form gửi đánh giá */}
                {canSocialInteract && <div
                    style={{
                        border: "1px solid #eee",
                        borderRadius: "8px",
                        padding: "15px",
                        marginBottom: "20px",
                    }}
                >
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", marginBottom: "10px" }}>
                        <div>
                            <b>Đánh giá chung:</b>{" "}
                            {[1, 2, 3, 4, 5].map((i) => (
                                <i
                                    key={i}
                                    role="button"
                                    aria-label={`${i} sao`}
                                    className={
                                        i <= star ? "fas fa-star" : "far fa-star"
                                    }
                                    style={{
                                        color: "#f5b301",
                                        cursor: "pointer",
                                        fontSize: "20px",
                                        marginRight: "4px",
                                    }}
                                    onClick={() => setStar(i)}
                                ></i>
                            ))}
                        </div>
                        <div>
                            <b>Trải nghiệm phỏng vấn & tốc độ phản hồi HR:</b>{" "}
                            {[1, 2, 3, 4, 5].map((i) => (
                                <i
                                    key={i}
                                    role="button"
                                    aria-label={`Trải nghiệm phỏng vấn ${i} sao`}
                                    className={
                                        i <= interviewExperienceRating ? "fas fa-star" : "far fa-star"
                                    }
                                    style={{
                                        color: "#10b981",
                                        cursor: "pointer",
                                        fontSize: "18px",
                                        marginRight: "4px",
                                    }}
                                    onClick={() => setInterviewExperienceRating(i)}
                                ></i>
                            ))}
                        </div>
                    </div>
                    <textarea
                        className="form-control"
                        rows={3}
                        placeholder="Chia sẻ cảm nhận thực tế về môi trường, quy trình phỏng vấn hoặc tốc độ phản hồi của HR..."
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    ></textarea>
                    <button
                        className="btn btn-primary"
                        style={{ marginTop: "10px" }}
                        onClick={() => handleSubmitReview()}
                    >
                        Gửi đánh giá (Tự động kiểm tra Huy hiệu Xác thực)
                    </button>
                </div>}

                {/* Danh sách đánh giá */}
                {listReview && listReview.length > 0 ? (
                    listReview.map((item, index) => {
                        const badge = VERIFICATION_BADGES[item.verificationType] || VERIFICATION_BADGES.PUBLIC;
                        return (
                            <div
                                key={index}
                                style={{
                                    borderBottom: "1px solid #f0f0f0",
                                    padding: "12px 0",
                                }}
                            >
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "10px",
                                    }}
                                >
                                    <img
                                        src={item.userReviewData.image}
                                        alt=""
                                        style={{
                                            width: "36px",
                                            height: "36px",
                                            borderRadius: "50%",
                                            objectFit: "cover",
                                        }}
                                    />
                                    <div>
                                        <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
                                            <b>
                                                {item.userReviewData.firstName +
                                                    " " +
                                                    item.userReviewData.lastName}
                                            </b>
                                            <span
                                                style={{
                                                    fontSize: "11px",
                                                    padding: "2px 8px",
                                                    borderRadius: "999px",
                                                    fontWeight: 600,
                                                    background: badge.bg,
                                                    color: badge.color,
                                                    border: `1px solid ${badge.border}`
                                                }}
                                            >
                                                {badge.label}
                                            </span>
                                        </div>
                                        <div style={{ fontSize: "12px", marginTop: "2px" }}>
                                            {renderStars(item.star)}
                                            {item.interviewExperienceRating != null && (
                                                <span style={{ marginLeft: "8px", color: "#047857", fontWeight: 600 }}>
                                                    • Phỏng vấn: {item.interviewExperienceRating}/5★
                                                </span>
                                            )}
                                            <span
                                                style={{
                                                    color: "#999",
                                                    marginLeft: "8px",
                                                }}
                                            >
                                                {formatJobTime(item.createdAt)}
                                            </span>
                                        </div>
                                    </div>
                                    {userData && hasPermission(userData, PERMISSIONS.SOCIAL_INTERACT) &&
                                        +userData.id ===
                                            +item.userReviewData.id && (
                                            <span
                                                style={{
                                                    marginLeft: "auto",
                                                    color: "#dc3545",
                                                    cursor: "pointer",
                                                    fontSize: "13px",
                                                }}
                                                onClick={() =>
                                                    handleDeleteReview(item.id)
                                                }
                                            >
                                                <i className="far fa-trash-alt"></i>{" "}
                                                Xóa
                                            </span>
                                        )}
                                </div>
                                <p
                                    style={{
                                        margin: "8px 0 0 46px",
                                        color: "#333",
                                    }}
                                >
                                    {item.content}
                                </p>
                            </div>
                        );
                    })
                ) : (
                    <div style={{ textAlign: "center", color: "#999" }}>
                        Chưa có đánh giá nào. Hãy là người đầu tiên đánh giá!
                    </div>
                )}
            </div>
        </div>
    );
};

export default CompanyReview;
