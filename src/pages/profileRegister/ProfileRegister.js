import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ProfileRegister.css"; // CSS 파일 import

const ProfileRegister = () => {
    const [nickname, setNickname] = useState("");
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState("");
    const [error, setError] = useState(null);
    const [user_no, setUserNo] = useState(null);
    const [hasExistingImage, setHasExistingImage] = useState(false);

    useEffect(() => {
        const storedUserNo = localStorage.getItem('user_no');
        if (storedUserNo) {
            setUserNo(Number(storedUserNo)); // 문자열을 숫자로 변환
        }

        // 기존 이미지 확인 로직
        const checkExistingImage = async () => {
            if (storedUserNo) {
                try {
                    const accessToken = localStorage.getItem('access_token');
                    const response = await axios.get(
                        `https://port-0-teamproject-2024-2-am952nlt496sho.sel5.cloudtype.app/users/profile/${storedUserNo}`,
                        {
                            headers: {
                                'Authorization': `Bearer ${accessToken}`
                            }
                        }
                    );
                    if (response.data.image_url) {
                        setHasExistingImage(true);
                    }
                } catch (error) {
                    console.error("기존 이미지 확인 중 오류 발생:", error);
                }
            }
        };

        checkExistingImage();
    }, []);

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

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        if (user_no === null) {
            setError("유효한 사용자 번호가 없습니다.");
            return;
        }
        if (!nickname) {
            setError("닉네임을 입력해주세요.");
            return;
        }
        if (!imageFile) {
            setError("이미지를 선택해주세요.");
            return;
        }
    
        const accessToken = localStorage.getItem('access_token');
    
        try {
            const formData = new FormData();
            formData.append('nickname', nickname);
            formData.append('file', imageFile);
    
            const response = await axios.post(
                `https://port-0-teamproject-2024-2-am952nlt496sho.sel5.cloudtype.app/users/profile-create/${user_no}`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${accessToken}`
                    }
                }
            );
    
            console.log('응답 데이터:', response.data);
    
            if (response.status === 200) {
                alert("프로필이 성공적으로 등록되었습니다!");
                setNickname("");
                setImagePreview("");
                setError(null);
            } else {
                throw new Error('프로필 등록에 실패했습니다.');
            }
        } catch (error) {
            if (error.response && error.response.data) {
                console.error("프로필 등록 중 오류 발생:", JSON.stringify(error.response.data, null, 2));
                setError(`프로필 등록에 실패했습니다: ${error.response.data.message || "알 수 없는 오류"}`);
            } else {
                console.error("프로필 등록 중 오류 발생:", error.message);
                setError("서버에 문제가 발생했습니다. 잠시 후 다시 시도해주세요.");
            }
        }
    };

    return (
        <div className="container">
            <div className="profile-frame">
                <h1 className="profile-title">프로필 등록</h1>
                {hasExistingImage ? (
                    <p className="info-text">이미 등록된 이미지가 있습니다.</p>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <div className="field-container">
                            <label className="label">닉네임</label>
                            <input
                                className="input-field"
                                type="text"
                                value={nickname}
                                onChange={handleNicknameChange}
                                placeholder="닉네임 입력"
                                required
                            />
                        </div>
                        <div className="field-container">
                            <label className="label">이미지 업로드</label>
                            <div className="custom-file-upload">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    required
                                    id="file-upload" // id 추가
                                />
                                <label htmlFor="file-upload">파일 선택</label> {/* 라벨 클릭 시 파일 선택 */}
                            </div>
                        </div>
                        {imagePreview && (
                            <div className="image-preview-container">
                                <img src={imagePreview} alt="미리보기" className="image-preview" />
                            </div>
                        )}
                        <div className="button-container">
                            <button className="update-button" type="submit" disabled={user_no === null}>프로필 등록</button>
                        </div>
                    </form>
                )}
                {error && <p className="error-text">{error}</p>}
            </div>
        </div>
    );
};

export default ProfileRegister;
