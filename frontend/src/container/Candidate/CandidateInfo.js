import React from "react";
import { useCallback, useEffect, useState } from "react";
import { getDetailUserById, UpdateUserService } from "../../service/userService";
import { syncGithubPortfolioSkillsService } from "../../service/differentiatorService";
import { useFetchAllcode } from "../../util/fetch";
import DatePicker from "react-datepicker";
import { toast } from "react-toastify";
import { birthDateValue, parseBirthDate } from "../../util/birthDate";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import { readAvatarImage } from "../../util/avatarImage";
import { updateSessionProfile } from "../../auth/sessionUser";

const CandidateInfo = () => {
    const [birthday, setbirthday] = useState(new Date());
    const [isChangeDate, setisChangeDate] = useState(false);
    const [isChangeImg, setisChangeImg] = useState(false);
    const [isActionADD, setisActionADD] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [githubUsername, setGithubUsername] = useState("");
    const [portfolioUrl, setPortfolioUrl] = useState("");
    const [syncingProof, setSyncingProof] = useState(false);
    const [verifiedSkills, setVerifiedSkills] = useState([]);
    const [inputValues, setInputValues] = useState({
        password: "",
        firstName: "",
        lastName: "",
        address: "",
        phonenumber: "",
        genderCode: "",
        roleCode: "",
        id: "",
        dob: "",
        image: "",
        imageReview: "",
        isOpen: false,
        email: "",
    });

    const setStateUser = useCallback((data) => {
        // Inputs stay controlled: profile columns such as address may be NULL.
        setInputValues((currentValues) => ({
            ...currentValues,
            "firstName": data.userAccountData.firstName ?? "",
            "lastName": data.userAccountData.lastName ?? "",
            "address": data.userAccountData.address ?? "",
            "phonenumber": data.phonenumber ?? "",
            "genderCode": data.userAccountData.genderCode ?? "",
            "roleCode": data.userAccountData.roleCode,
            "id": data.userAccountData.id,
            "dob": data.userAccountData.dob,
            "image": data.userAccountData.image,
            "imageReview": data.userAccountData.image,
            "email": data.userAccountData.email ?? "",
        }));
        setbirthday(parseBirthDate(data.userAccountData.dob));
        if (Array.isArray(data.listSkills)) {
            const verified = data.listSkills
                .filter(item => Number(item.isVerified) === 1)
                .map(item => ({
                    skillId: item.SkillId,
                    skillName: item.skillData?.name || `Kỹ năng #${item.SkillId}`,
                    source: item.verificationSource || "PORTFOLIO",
                    proof: item.proofMetadata
                }));
            setVerifiedSkills(verified);
        }
    }, []);
    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem("userData"));
        if (userData) {
            let fetchUser = async () => {
                setisActionADD(false);
                let user = await getDetailUserById(userData.id);
                if (user && user.errCode === 0) {
                    setStateUser(user.data);
                }
            };
            fetchUser();
        }
    }, [setStateUser]);

    const { data: dataGender } = useFetchAllcode("GENDER");
    const { data: dataRole } = useFetchAllcode("ROLE");

    if (
        dataGender &&
        dataGender.length > 0 &&
        inputValues.genderCode === "" &&
        dataRole &&
        dataRole.length > 0 &&
        inputValues.roleCode === ""
    ) {
        setInputValues({
            ...inputValues,
            "genderCode": dataGender[0].code,
            "roleCode": dataRole[0].code,
        });
    }

    const handleOnChange = (event) => {
        const { name, value } = event.target;
        setInputValues({ ...inputValues, [name]: value });
    };

    let handleOnChangeDatePicker = (date) => {
        setbirthday(date);
        setisChangeDate(true);
    };
    let handleOnChangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let base64 = await readAvatarImage(file);
            let objectUrl = URL.createObjectURL(file);
            setisChangeImg(true);
            setInputValues((currentValues) => ({
                ...currentValues,
                "image": base64,
                "imageReview": objectUrl,
            }));
        }
    };
    let openPreviewImage = () => {
        if (!inputValues.imageReview) return;

        setInputValues({ ...inputValues, "isOpen": true });
    };
    let handleSaveUser = async () => {
        if (isSaving) return;
        setIsSaving(true);
        try {
            let res = await UpdateUserService({
                id: inputValues.id,
                firstName: inputValues.firstName,
                lastName: inputValues.lastName,
                address: inputValues.address,
                roleCode: inputValues.roleCode,
                genderCode: inputValues.genderCode,
                dob:
                    isChangeDate === false
                        ? inputValues.dob
                        : birthDateValue(birthday),
                image: isChangeImg ? inputValues.image : null,
                email: inputValues.email,
            });
            if (res && res.errCode === 0) {
                // Update the header in place: a full reload re-verified the whole session
                // and made a saved avatar take seconds to appear.
                updateSessionProfile(res.user);
                if (isChangeImg && res.user?.image) {
                    setisChangeImg(false);
                    setInputValues((currentValues) => ({ ...currentValues, "image": res.user.image }));
                }
                toast.success("Cập nhật người dùng thành công");
            } else {
                toast.error(res?.errMessage || "Không thể cập nhật thông tin. Vui lòng thử lại.");
            }
        } catch {
            toast.error("Không thể cập nhật thông tin. Vui lòng thử lại.");
        } finally {
            setIsSaving(false);
        }
    };

    const handleSyncProofOfSkill = async () => {
        if (!githubUsername.trim() && !portfolioUrl.trim()) {
            toast.warning("Vui lòng nhập GitHub Username hoặc Link Portfolio / Chứng chỉ (Behance, Figma, Google Drive, LinkedIn...).");
            return;
        }
        setSyncingProof(true);
        try {
            const res = await syncGithubPortfolioSkillsService({
                githubUsername: githubUsername.trim(),
                portfolioUrl: portfolioUrl.trim()
            });
            if (res?.errCode === 0) {
                const list = res.data?.verifiedSkills || [];
                setVerifiedSkills(list.map((item, idx) => ({
                    skillId: item.skillId || idx + 1,
                    skillName: item.skillName || item.language || "Kỹ năng chuyên môn",
                    source: item.verificationSource || "PORTFOLIO",
                    proof: item.proofSummary
                })));
                toast.success(res.errMessage || "Đã xác thực năng lực thực tế (Proof-of-Skill) thành công!");
            } else {
                toast.error(res?.errMessage || "Không thể xác thực kỹ năng.");
            }
        } catch {
            toast.error("Lỗi kết nối khi xác thực kỹ năng.");
        } finally {
            setSyncingProof(false);
        }
    };

    return (
        <div className="">
            <div className="col-12 grid-margin">
                <div className="card">
                    <div className="card-body">
                        <h4 className="card-title">Thông tin cá nhân</h4>
                        <form className="form-sample">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group row">
                                        <label className="col-sm-3 col-form-label">
                                            Họ
                                        </label>
                                        <div className="col-sm-9">
                                            <input
                                                type="text"
                                                value={inputValues.firstName}
                                                name="firstName"
                                                onChange={(event) =>
                                                    handleOnChange(event)
                                                }
                                                className="form-control"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group row">
                                        <label className="col-sm-3 col-form-label">
                                            Tên
                                        </label>
                                        <div className="col-sm-9">
                                            <input
                                                type="text"
                                                value={inputValues.lastName}
                                                name="lastName"
                                                onChange={(event) =>
                                                    handleOnChange(event)
                                                }
                                                className="form-control"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group row">
                                        <label className="col-sm-3 col-form-label">
                                            Địa chỉ
                                        </label>
                                        <div className="col-sm-9">
                                            <input
                                                type="text"
                                                value={inputValues.address}
                                                name="address"
                                                onChange={(event) =>
                                                    handleOnChange(event)
                                                }
                                                className="form-control"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group row">
                                        <label className="col-sm-3 col-form-label">
                                            Số điện thoại
                                        </label>
                                        <div className="col-sm-9">
                                            <input
                                                // Phone numbers are text: type="number" lets arrow keys
                                                // and the wheel rewrite 0909123456 into 909123457.
                                                type="tel"
                                                inputMode="numeric"
                                                value={inputValues.phonenumber}
                                                disabled={
                                                    isActionADD === true
                                                        ? false
                                                        : true
                                                }
                                                name="phonenumber"
                                                onChange={(event) =>
                                                    handleOnChange(event)
                                                }
                                                className="form-control"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group row">
                                        <label className="col-sm-3 col-form-label">
                                            Giới tính
                                        </label>
                                        <div className="col-sm-9">
                                            <select
                                                style={{ color: "black" }}
                                                className="form-control"
                                                value={inputValues.genderCode}
                                                name="genderCode"
                                                onChange={(event) =>
                                                    handleOnChange(event)
                                                }
                                            >
                                                {dataGender &&
                                                    dataGender.length > 0 &&
                                                    dataGender.map(
                                                        (item, index) => {
                                                            return (
                                                                <option
                                                                    key={index}
                                                                    value={
                                                                        item.code
                                                                    }
                                                                >
                                                                    {item.value}
                                                                </option>
                                                            );
                                                        }
                                                    )}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group row">
                                        <label className="col-sm-3 col-form-label">
                                            Ngày sinh
                                        </label>
                                        <div className="col-sm-9">
                                            <DatePicker
                                                className="form-control"
                                                onChange={
                                                    handleOnChangeDatePicker
                                                }
                                                selected={birthday}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group row">
                                        <label className="col-sm-3 col-form-label">
                                            Hình ảnh
                                        </label>
                                        <div className="col-sm-9">
                                            <input
                                                aria-label="Tải hình ảnh"
                                                accept="image/*"
                                                onChange={(event) =>
                                                    handleOnChangeImage(event)
                                                }
                                                type="file"
                                                disabled={isSaving}
                                                className="form-control form-file"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group row">
                                        <label className="col-sm-3 col-form-label">
                                            Hình ảnh hiển thị
                                        </label>
                                        <div className="col-sm-9">
                                            <div
                                                role="button"
                                                aria-label="Xem ảnh đại diện"
                                                style={{
                                                    backgroundImage: `url(${inputValues.imageReview})`,
                                                }}
                                                onClick={() =>
                                                    openPreviewImage()
                                                }
                                                className="box-img-preview"
                                            ></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group row">
                                        <label className="col-sm-3 col-form-label">
                                            Email
                                        </label>
                                        <div className="col-sm-9">
                                            <input
                                                type="email"
                                                value={inputValues.email}
                                                name="email"
                                                onChange={(event) =>
                                                    handleOnChange(event)
                                                }
                                                className="form-control"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <button
                                type="button"
                                onClick={() => handleSaveUser()}
                                disabled={isSaving}
                                aria-busy={isSaving}
                                className="btn1 btn1-primary1 btn1-icon-text"
                            >
                                <i className="ti-file btn1-icon-prepend"></i>
                                {isSaving ? "Đang lưu..." : "Lưu"}
                            </button>
                        </form>

                        {/* Xác thực Năng lực Thực tế Đa ngành (Proof-of-Skill) */}
                        <div className="card mt-4" style={{ border: "1px solid #a7f3d0", background: "#f0fdf4" }}>
                            <div className="card-body">
                                <h5 className="mb-2" style={{ color: "#065f46", fontWeight: 700 }}>
                                    🏅 Xác thực Năng lực Thực tế Đa ngành (Proof-of-Skill)
                                </h5>
                                <p className="text-muted mb-3" style={{ fontSize: "13px" }}>
                                    Liên kết <b>Portfolio / Case Study / Chứng chỉ</b> (Behance, Figma, Google Drive, Canva, LinkedIn, IELTS/MOS/ACCA) hoặc <b>GitHub</b> để gắn huy hiệu <b>✓ Đã xác thực</b> lên kỹ năng trong kho CV của bạn.
                                </p>
                                <div className="row">
                                    <div className="col-md-5 mb-2">
                                        <label className="form-label" style={{ fontSize: "12px", fontWeight: 600 }}>
                                            Link Portfolio / Case Study / Chứng chỉ (Mọi ngành)
                                        </label>
                                        <input
                                            type="url"
                                            className="form-control"
                                            placeholder="https://behance.net/... hoặc drive.google.com/..."
                                            value={portfolioUrl}
                                            onChange={e => setPortfolioUrl(e.target.value)}
                                        />
                                    </div>
                                    <div className="col-md-4 mb-2">
                                        <label className="form-label" style={{ fontSize: "12px", fontWeight: 600 }}>
                                            GitHub Username (Tùy chọn cho khối Kỹ thuật/IT)
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="VD: torvalds"
                                            value={githubUsername}
                                            onChange={e => setGithubUsername(e.target.value)}
                                        />
                                    </div>
                                    <div className="col-md-3 mb-2 d-flex align-items-end">
                                        <button
                                            type="button"
                                            className="btn btn-success w-100"
                                            disabled={syncingProof}
                                            onClick={handleSyncProofOfSkill}
                                        >
                                            {syncingProof ? "Đang xác thực..." : "✓ Đồng bộ & Cấp huy hiệu"}
                                        </button>
                                    </div>
                                </div>
                                {verifiedSkills.length > 0 && (
                                    <div className="mt-3">
                                        <strong style={{ fontSize: "12.5px", color: "#065f46" }}>Huy hiệu Kỹ năng đã xác thực trên hồ sơ:</strong>
                                        <div className="d-flex flex-wrap mt-2" style={{ gap: "8px" }}>
                                            {verifiedSkills.map((item, idx) => (
                                                <span
                                                    key={idx}
                                                    style={{
                                                        background: "#dcfce7",
                                                        color: "#166534",
                                                        border: "1px solid #86efac",
                                                        padding: "4px 10px",
                                                        borderRadius: "999px",
                                                        fontSize: "12px",
                                                        fontWeight: 600
                                                    }}
                                                >
                                                    ✓ {item.skillName} ({item.source})
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {inputValues.isOpen === true && (
                <Lightbox
                    mainSrc={inputValues.imageReview}
                    onCloseRequest={() =>
                        setInputValues({ ...inputValues, "isOpen": false })
                    }
                />
            )}
        </div>
    );
};

export default CandidateInfo;
