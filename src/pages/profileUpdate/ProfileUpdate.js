import React, { useState, useEffect } from "react";
import axios from "axios";
import "./profileUpdate.css"; // CSS 경로입니다

const ProfileUpdate = () => {
    const [nickname, setNickname] = useState("");
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState("");
    const [error, setError] = useState(null);
    const [user_no, setUserNo] = useState(null);
    
    // 사용자 정보 상태 추가
    const [email, setEmail] = useState("");
    const [cellPhone, setCellPhone] = useState("");
    const [birthday, setBirthday] = useState("");
    const [gender, setGender] = useState("");
    
    // 비밀번호 변경 상태
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    // 프로필 등록 여부 확인 상태
    const [isProfileRegistered, setIsProfileRegistered] = useState(false);

    // API 고정 경로 정의
    const API_BASE_URL = "https://port-0-teamproject-2024-2-am952nlt496sho.sel5.cloudtype.app";

    // 사용자 번호와 프로필 정보 가져오기
    useEffect(() => {
        console.log("useEffect 실행됨: 사용자 정보 및 이미지 가져오기 시작");
        const storedUserNo = localStorage.getItem('user_no');
        if (storedUserNo) {
            setUserNo(Number(storedUserNo)); // 사용자 번호 설정
            fetchUserProfile(Number(storedUserNo)); // 프로필 정보 가져오기
            fetchUserProfileImage(Number(storedUserNo)); // 프로필 이미지 가져오기
        }
    }, []);

    const fetchUserProfile = async (user_no) => {
        const accessToken = localStorage.getItem('access_token');
        try {
            console.log("프로필 정보 가져오는 요청 시작");
            const response = await axios.get(
                `${API_BASE_URL}/users/profile/${user_no}`, // 고정 경로 사용
                {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    },
                    withCredentials: true // 쿠키 포함
                }
            );

            const { nickname, email, cell_phone, birthday, gender } = response.data;
            setNickname(nickname);
            
            // 사용자 정보 설정
            setEmail(email);
            setCellPhone(cell_phone);
            setBirthday(birthday);
            setGender(gender);

            // 프로필 등록 여부 설정
            setIsProfileRegistered(true);
        } catch (error) {
            console.error("사용자 프로필 정보를 가져오는 중 오류 발생:", error);
            setError("사용자 정보를 불러오는 데 실패했습니다.");
            setIsProfileRegistered(false); // 프로필이 없을 경우 등록되지 않은 것으로 설정
        }
    };

    const fetchUserProfileImage = async (user_no) => {
        console.log("fetchUserProfileImage 호출됨: 사용자 번호", user_no);
        const accessToken = localStorage.getItem('access_token');
        try {
            const response = await axios.get(
                `${API_BASE_URL}/users/profile-image/${user_no}`, // 고정 경로 사용
                {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    },
                    responseType: 'blob', // 이미지 데이터를 blob으로 받기
                    withCredentials: true // 쿠키 포함
                }
            );
            console.log("프로필 이미지 서버 응답:", response);

            const imageBlob = response.data;
            const imageUrl = URL.createObjectURL(imageBlob);
            setImagePreview(imageUrl);
            console.log("이미지 URL:", imageUrl);

            // 프로필 등록 여부 설정
            setIsProfileRegistered(true);
        } catch (error) {
            if (error.response && error.response.status === 404) {
                console.warn("프로필 이미지를 찾을 수 없습니다.");
                setImagePreview("");
            } else {
                console.error("사용자 프로필 이미지를 가져오는 중 오류 발생:", error);
                setError("사용자 프로필 이미지를 불러오는 데 실패했습니다.");
            }
            setIsProfileRegistered(false); // 프로필이 없을 경우 등록되지 않은 것으로 설정
        }
    };

    const handleNicknameChange = (e) => {
        setNickname(e.target.value);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file); // 이미지 파일 설정
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result); // 이미지 미리보기 업데이트
            };
            reader.readAsDataURL(file); // 파일을 Data URL로 읽기
        }
    };

    const handleProfileUpdate = async (e) => {
        e.preventDefault();
        if (user_no === null) {
            setError("유효한 사용자 번호가 없습니다.");
            return;
        }

        const accessToken = localStorage.getItem('access_token');

        try {
            // 유효성 검증 추가
            if (!nickname && !imageFile) {
                setError("닉네임 또는 이미지를 입력해주세요.");
                return;
            }
            if (imageFile && !["image/jpeg", "image/png"].includes(imageFile.type)) {
                setError("올바른 형식의 이미지를 업로드해주세요 (jpeg 또는 png).");
                return;
            }

            const formData = new FormData();
            formData.append("nickname", nickname);
            if (imageFile) {
                formData.append("file", imageFile);
            }

            if (!isProfileRegistered) {
                // 프로필 등록 (POST 요청)
                await axios.post(
                    `${API_BASE_URL}/users/profile-create/${user_no}`,
                    formData,
                    {
                        headers: {
                            'Authorization': `Bearer ${accessToken}`
                        },
                        withCredentials: true
                    }
                );
                setIsProfileRegistered(true);
                alert("프로필이 성공적으로 등록되었습니다!");
            } else {
                // 프로필 업데이트 (PUT 요청)
                try {
                    await axios.put(
                        `${API_BASE_URL}/users/profile-update/${user_no}`, // 고정 경로 사용
                        formData,
                        {
                            headers: {
                                'Authorization': `Bearer ${accessToken}`
                            },
                            withCredentials: true // 쿠키 포함
                        }
                    );
                    alert("프로필이 성공적으로 수정되었습니다!");
                } catch (putError) {
                    if (putError.response && putError.response.status === 404) {
                        // 프로필이 없는 경우 POST 요청으로 다시 시도
                        console.warn("프로필이 존재하지 않습니다. 새로 등록합니다.");
                        await axios.post(
                            `${API_BASE_URL}/users/profile-create/${user_no}`,
                            formData,
                            {
                                headers: {
                                    'Authorization': `Bearer ${accessToken}`
                                },
                                withCredentials: true
                            }
                        );
                        setIsProfileRegistered(true);
                        alert("프로필이 성공적으로 등록되었습니다!");
                    } else {
                        throw putError;
                    }
                }
            }
        } catch (error) {
            if (error.response && error.response.data) {
                console.error("프로필 수정 중 오류 발생:", JSON.stringify(error.response.data, null, 2));
                setError(`프로필 수정에 실패했습니다: ${error.response.data.message || "알 수 없는 오류"}`);
            } else {
                console.error("프로필 수정 중 오류 발생:", error);
                setError("프로필 수정에 실패했습니다.");
            }
        }
    };

    const handlePasswordChange = async (e) => {
        e.preventDefault();
        const accessToken = localStorage.getItem('access_token');

        if (newPassword !== confirmPassword) {
            setError("비밀번호가 일치하지 않습니다.");
            return;
        }

        try {
            const response = await axios.put(
                `${API_BASE_URL}/users/change-password`, // 고정 경로 사용
                { password: newPassword },
                {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    },
                    withCredentials: true // 쿠키 포함
                }
            );

            console.log(response.data);
            alert("비밀번호가 성공적으로 변경되었습니다!");
        } catch (error) {
            console.error("비밀번호 변경 중 오류 발생:", error);
            setError("비밀번호 변경에 실패했습니다.");
        }
    };

    return (
        <div className="container">
            <div className="profile-frame">
                <h1 className="profile-title">마이페이지</h1>
                {/* 사용자 정보 표시 */}
                <div className="user-info-container">
                    <div className="user-info-item" style={{ textAlign: 'left' }}>
                        <label className="label">이메일</label>
                        <p className="user-info-value" style={{ textAlign: 'left' }}>{email}</p>
                    </div>
                    <div className="user-info-item" style={{ textAlign: 'left' }}>
                        <label className="label">전화번호</label>
                        <p className="user-info-value" style={{ textAlign: 'left' }}>
                          {cellPhone.replace(/(\d{3})(\d{3,4})(\d{4})/, '$1-$2-$3')}
                        </p>
                    </div>
                    <div className="user-info-item" style={{ textAlign: 'left' }}>
                        <label className="label">생일</label>
                        <p className="user-info-value" style={{ textAlign: 'left' }}>
                          {birthday ? `${new Date(birthday).getFullYear()}년 ${(new Date(birthday).getMonth() + 1).toString().padStart(2, '0')}월 ${new Date(birthday).getDate().toString().padStart(2, '0')}일` : "생일 정보 없음"}
                        </p>
                    </div>
                    <div className="user-info-item" style={{ textAlign: 'left' }}>
                        <label className="label">성별</label>
                        <p className="user-info-value" style={{ textAlign: 'left' }}>{gender}</p>
                    </div>
                </div>
                <form onSubmit={handleProfileUpdate}>
                    {/* 닉네임 필드 */}
                    <div className="field-container">
                        <label className="label">닉네임</label>
                        <input
                            className="input-field"
                            type="text"
                            value={nickname || ""}
                            onChange={handleNicknameChange}
                            placeholder="닉네임"
                        />
                    </div>

                    {/* 이미지 업로드 필드 */}
                    <div className="field-container">
                        <label className="label">이미지 업로드</label>
                        <div className="custom-file-upload">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                id="file-upload"
                            />
                            <label htmlFor="file-upload"></label> 
                        </div>
                    </div>
                    {imagePreview && (
                        <div className="profile-image-container">
                            <img
                                src={imagePreview}
                                alt="미리보기"
                                className="profile-image"
                                style={{ width: '150px', height: '150px', borderRadius: '50%', objectFit: 'cover' }}
                            />
                        </div>
                    )}


                    {/* 수정 버튼 */}
                    <div className="button-container">
                        <button className="update-button" type="submit" disabled={user_no === null}>프로필 업로드</button> 
                    </div>
                </form>

                {/* 비밀번호 변경 폼 */}
                <form onSubmit={handlePasswordChange}>
                    <div className="field-container">
                        <label className="label">새 비밀번호</label>
                        <input
                            className="input-field"
                            type="password"
                            value={newPassword || ""}
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder="새 비밀번호"
                            required
                        />
                    </div>
                    <div className="field-container">
                        <label className="label">비밀번호 확인</label>
                        <input
                            className="input-field"
                            type="password"
                            value={confirmPassword || ""}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="비밀번호 확인"
                            required
                        />
                    </div>
                    <div className="button-container">
                        <button className="update-button" type="submit">비밀번호 변경</button>
                    </div>
                </form>

                {error && <p className="error-text">{error}</p>}
            </div>
        </div>
    );
};

export default ProfileUpdate;