import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Profile.css'; // CSS 파일 import

const Profile = () => {
    const [profile, setProfile] = useState(null);
    const [nickname, setNickname] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const userNo = localStorage.getItem('userNo'); // 로컬 스토리지에서 사용자 번호 가져오기
    const token = localStorage.getItem('token'); // 로컬 스토리지에서 JWT 토큰 가져오기
    const [loading, setLoading] = useState(true); // 로딩 상태 관리

    useEffect(() => {
        const fetchProfile = async () => {
            setLoading(true); // 데이터 로드 시작
            try {
                const response = await axios.get(`https://port-0-teamproject-2024-2-am952nlt496sho.sel5.cloudtype.app/users/profile/${userNo}`, {
                    headers: {
                        Authorization: `Bearer ${token}` // JWT 토큰을 헤더에 추가
                    }
                });
                setProfile(response.data);
                setNickname(response.data.nickname);
                setImageUrl(response.data.image_url);
            } catch (error) {
                console.error('Error fetching profile:', error);
            } finally {
                setLoading(false); // 데이터 로드 완료
            }
        };

        fetchProfile();
    }, [userNo, token]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // 프로필 업데이트
            await axios.put(`https://port-0-teamproject-2024-2-am952nlt496sho.sel5.cloudtype.app/users/profile-update/${userNo}`, {
                nickname,
                image_url: imageUrl
            }, {
                headers: {
                    Authorization: `Bearer ${token}` // JWT 토큰을 헤더에 추가
                }
            });
            alert('Profile updated successfully!');
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('프로필을 수정하는 중 오류가 발생했습니다.');
        }
    };

    return (
        <div className="container">
            <div className="profile-frame">
                {loading ? ( // 로딩 상태에 따라 다르게 표시
                    <div className="loading-container">
                        <p className="loading-text">Loading...</p>
                        <div className="loader"></div> {/* 로딩 애니메이션 추가 */}
                    </div>
                ) : profile ? (
                    <>
                        <h1 className="profile-title">{profile.nickname}</h1>
                        <img className="profile-image" src={profile.image_url} alt="Profile" />
                        <form onSubmit={handleSubmit}>
                            <div className="field-container">
                                <label className="label">Nickname</label>
                                <input
                                    className="input-field"
                                    type="text"
                                    value={nickname}
                                    onChange={(e) => setNickname(e.target.value)}
                                    placeholder="Nickname"
                                    required
                                />
                            </div>
                            <div className="field-container">
                                <label className="label">Image URL</label>
                                <input
                                    className="input-field"
                                    type="text"
                                    value={imageUrl}
                                    onChange={(e) => setImageUrl(e.target.value)}
                                    placeholder="Image URL"
                                    required
                                />
                            </div>
                            <div className="button-container">
                                <button className="update-button" type="submit">Update Profile</button>
                            </div>
                        </form>
                    </>
                ) : (
                    <p className="error-text">프로필을 가져오는 데 문제가 발생했습니다.</p>
                )}
            </div>
        </div>
    );
};

export default Profile;
