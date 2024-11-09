import React from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate 훅 가져오기
import './HeaderComponent.css';
import sunabLogo from '../../pages/image/sunab.png';

function HeaderComponent({ isOpen }) {
  const navigate = useNavigate(); // useNavigate 훅 사용

  const handleLogoClick = () => {
    navigate('/home'); // 로고 클릭 시 '/home' 페이지로 이동
  };

  return (
    <div className={`header-container ${isOpen ? 'sidebar-open' : ''}`}>
      <img
        src={sunabLogo}
        alt="Logo"
        className="header-logo"
        onClick={handleLogoClick} // 로고 클릭 핸들러 추가
        style={{ cursor: 'pointer' }} // 클릭 가능하게 커서 스타일 변경
      />
      <div className={`input-container ${isOpen ? 'sidebar-open' : ''}`}>
        <input
          type="text"
          name="text"
          className="input"
          placeholder="찾는 물건 이름을 입력하세요"
        />
        <span className="icon">
          <svg
            width="19px"
            height="19px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14 5H20"
              stroke="#000"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M14 8H17"
              stroke="#000"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M21 11.5C21 16.75 16.75 21 11.5 21C6.25 21 2 16.75 2 11.5C2 6.25 6.25 2 11.5 2"
              stroke="#000"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M22 22L20 20"
              stroke="#000"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>
    </div>
  );
}

export default HeaderComponent;
