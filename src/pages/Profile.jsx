import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Profile.css'; // CSS 파일 import

const Profile = () => {
    const [profile, setProfile] = useState(null);
    const [nickname, setNickname] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get('/api/users/{user_no}/profile'); // 백엔드 API에 맞춰서 수정
                setProfile(response.data);
                setNickname(response.data.nickname);
                setImageUrl(response.data.image_url);
            } catch (error) {
                console.error('Error fetching profile:', error);
            }
        };

        fetchProfile();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put('/api/users/{user_no}/profile-update', { nickname, image_url: imageUrl });
            alert('Profile updated successfully!');
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('프로필을 수정하는 중 오류가 발생했습니다.');
        }
    };

    return (
        <div className="container">
            <div className="profile-frame">
                {profile ? (
                    <>
                        <h1 className="profile-title">{profile.nickname}</h1>
                        <img src={profile.image_url} alt="Profile" />
                        <form onSubmit={handleSubmit}>
                            <div className="field-container">
                                <label className="label">Nickname</label>
                                <input
                                    className="input-field"
                                    type="text"
                                    value={nickname}
                                    onChange={(e) => setNickname(e.target.value)}
                                    placeholder="Nickname"
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
                                />
                            </div>
                            <div className="button-container">
                                <button className="update-button" type="submit">Update Profile</button>
                            </div>
                        </form>
                    </>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </div>
    );
};

export default Profile;
