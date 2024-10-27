import React, { useState, useEffect } from "react";
import axios from "axios";
import "./profileUpdate.css"; // CSS 파일 import

const ProfileUpdate = () => {
    const [nickname, setNickname] = useState("");
    const [imageUrl, setImageUrl] = useState("");
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

    // 사용자 번호와 프로필 정보 가져오기
    useEffect(() => {
        const storedUserNo = localStorage.getItem('user_no');
        if (storedUserNo) {
            setUserNo(Number(storedUserNo)); // 사용자 번호 설정
            fetchUserProfile(Number(storedUserNo)); // 프로필 정보 가져오기
        }
    }, []);

    const fetchUserProfile = async (user_no) => {
        const accessToken = localStorage.getItem('access_token');
        try {
            const response = await axios.get(
                `https://port-0-teamproject-2024-2-am952nlt496sho.sel5.cloudtype.app/users/profile/${user_no}`, // 프로필 정보 가져오는 API
                {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                }
            );

            const { nickname, image_url, email, cell_phone, birthday, gender } = response.data;
            setNickname(nickname);
            setImageUrl(image_url);
            setImagePreview(image_url); // 초기 이미지 미리보기 설정
            
            // 사용자 정보 설정
            setEmail(email);
            setCellPhone(cell_phone);
            setBirthday(birthday);
            setGender(gender);
        } catch (error) {
            console.error("사용자 프로필 정보를 가져오는 중 오류 발생:", error);
            setError("사용자 정보를 불러오는 데 실패했습니다.");
        }
    };

    const handleNicknameChange = (e) => {
        setNickname(e.target.value);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result); // 이미지 미리보기 업데이트
                setImageUrl(file.name); // 파일 이름을 이미지 URL로 설정
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

        const data = {
            nickname: nickname,
            image_url: imageUrl, // 이미지 URL (파일 이름)
        };

        const accessToken = localStorage.getItem('access_token');

        try {
            const response = await axios.put(
                `https://port-0-teamproject-2024-2-am952nlt496sho.sel5.cloudtype.app/users/profile-update/${user_no}`,
                data,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}` // 액세스 토큰 포함
                    }
                }
            );

            console.log(response.data);
            alert("프로필이 성공적으로 수정되었습니다!");
        } catch (error) {
            console.error("프로필 수정 중 오류 발생:", error);
            setError("프로필 수정에 실패했습니다.");
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
                `https://port-0-teamproject-2024-2-am952nlt496sho.sel5.cloudtype.app/users/change-password`,
                { password: newPassword },
                {
                    headers: {
                        'Authorization': `Bearer ${accessToken}` // 액세스 토큰 포함
                    }
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
                        <p className="user-info-value" style={{ textAlign: 'left' }}>{cellPhone}</p>
                    </div>
                    <div className="user-info-item" style={{ textAlign: 'left' }}>
                        <label className="label">생일</label>
                        <p className="user-info-value" style={{ textAlign: 'left' }}>{birthday}</p>
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
                            value={nickname}
                            onChange={handleNicknameChange}
                            placeholder="닉네임"
                            required
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
                            <label htmlFor="file-upload">파일 선택</label>
                        </div>
                    </div>
                    {imagePreview && (
                        <div className="image-preview-container">
                            <img src={imagePreview} alt="미리보기" className="image-preview" />
                        </div>
                    )}

                    {/* 수정 버튼 */}
                    <div className="button-container">
                        <button className="update-button" type="submit" disabled={user_no === null}>프로필 수정</button>
                    </div>
                </form>

                {/* 비밀번호 변경 폼 */}
                <form onSubmit={handlePasswordChange}>
                    <div className="field-container">
                        <label className="label">새 비밀번호</label>
                        <input
                            className="input-field"
                            type="password"
                            value={newPassword}
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
                            value={confirmPassword}
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