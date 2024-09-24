// src/api.js
import axios from 'axios';

// API 기본 URL 설정
const API_URL = 'http://localhost:8000'; // 실제 백엔드 URL로 변경하세요.

// 프로필 생성
export const createProfile = async (userNo, profileData, token) => {
    try {
        const response = await axios.post(`${API_URL}/users/profile-create/${userNo}`, profileData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// 프로필 업데이트
export const updateProfile = async (userNo, profileData, token) => {
    try {
        const response = await axios.put(`${API_URL}/users/profile-update/${userNo}`, profileData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};
