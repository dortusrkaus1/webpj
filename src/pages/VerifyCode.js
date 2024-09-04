// src/pages/VerifyCode.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function VerifyCode() {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/users/verify-code', { email, code });
      alert('계정이 인증되었습니다.');
      navigate('/login');
    } catch (error) {
      alert('인증 실패: ' + error.response.data.detail);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>이메일 인증</h2>
      <input
        type="email"
        placeholder="이메일"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="text"
        placeholder="인증 코드"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
      <button type="submit">코드 인증</button>
    </form>
  );
}

export default VerifyCode;
