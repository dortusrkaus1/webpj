import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './SignUp.css'; 

function SignUp() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    user_name: '',
    cell_phone: '',
    address: '',
    gender: '남성',  
    birthday: { year: '', month: '', day: '' }
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      birthday: {
        ...prevFormData.birthday,
        [name]: value
      }
    }));
  };

  const handleGenderChange = (e) => {
    setFormData(prevFormData => ({
      ...prevFormData,
      gender: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formattedBirthday = `${formData.birthday.year}-${formData.birthday.month.padStart(2, '0')}-${formData.birthday.day.padStart(2, '0')}`;
      await axios.post('http://localhost:8000/users/signup', { ...formData, birthday: formattedBirthday });
      alert('회원가입 성공! 이메일을 확인하여 인증 코드를 입력하세요.');
      navigate('/verify-code');
    } catch (error) {
      alert('회원가입 실패: ' + (error.response ? error.response.data.detail : error.message));
    }
  };

  return (
    <div className="container-7">
      <div className="frame-13">
        <div className="sign-up">Sign up</div>
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <div className="field-container">
            <div className="label">이름</div>
            <input
              type="text"
              name="user_name"
              placeholder="홍길동"
              value={formData.user_name}
              onChange={handleChange}
              className="input-field name-input"
            />
          </div>
          <div className="field-container">
            <div className="label">이메일</div>
            <input
              type="email"
              name="email"
              placeholder="rlfehd@gmail.com"
              value={formData.email}
              onChange={handleChange}
              className="input-field"
            />
          </div>
          <div className="field-container">
            <div className="label">주소</div>
            <input
              type="text"
              name="address"
              placeholder="주소를 입력하세요"
              value={formData.address}
              onChange={handleChange}
              className="input-field"
            />
          </div>
          <div className="field-container">
            <div className="label">전화번호</div>
            <input
              type="text"
              name="cell_phone"
              placeholder="010-1234-5678"
              value={formData.cell_phone}
              onChange={handleChange}
              className="input-field"
            />
          </div>
          <div className="field-container">
            <div className="label">비밀번호</div>
            <input
              type="password"
              name="password"
              placeholder="비밀번호를 입력하세요"
              value={formData.password}
              onChange={handleChange}
              className="input-field"
            />
          </div>
          <div className="field-container">
            <div className="label">성별</div>
            <div className="gender-container">
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="남성"
                  checked={formData.gender === '남성'}
                  onChange={handleGenderChange}
                />
                <span>남성</span>
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="여성"
                  checked={formData.gender === '여성'}
                  onChange={handleGenderChange}
                />
                <span>여성</span>
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="기타"
                  checked={formData.gender === '기타'}
                  onChange={handleGenderChange}
                />
                <span>기타</span>
              </label>
            </div>
          </div>
          <div className="field-container">
            <div className="birthday-label">생년월일</div>
            <div className="birthday-container">
              <select
                name="year"
                value={formData.birthday.year}
                onChange={handleDateChange}
                className="input-field"
              >
                <option value="">년</option>
                {[...Array(100).keys()].map(i => (
                  <option key={i} value={2024 - i}>{2024 - i}</option>
                ))}
              </select>
              <select
                name="month"
                value={formData.birthday.month}
                onChange={handleDateChange}
                className="input-field"
              >
                <option value="">월</option>
                {[...Array(12).keys()].map(i => (
                  <option key={i + 1} value={i + 1}>{i + 1}</option>
                ))}
              </select>
              <select
                name="day"
                value={formData.birthday.day}
                onChange={handleDateChange}
                className="input-field"
              >
                <option value="">일</option>
                {[...Array(31).keys()].map(i => (
                  <option key={i + 1} value={i + 1}>{i + 1}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="button-container">
            <button type="button" className="group-9" onClick={() => navigate('/')}>
            취소
            </button>
            <button type="submit" className="group-10">
              회원가입
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;