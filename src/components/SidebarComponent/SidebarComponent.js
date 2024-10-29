// SidebarComponent.js
import React from 'react';
import './SidebarComponent.css';

const SidebarComponent = () => {
  return (
    <aside className="side-bar">
      <section className="side-bar__icon-box">
        <section className="side-bar__icon-1">
          <div></div>
          <div></div>
          <div></div>
        </section>
      </section>
      <ul>
        <li>
          <a href="#" className="menu-text"><i className="fa-solid fa-cat"></i>마이페이지</a>
          <ul>
            <li><a href="#" className="menu-text">text1</a></li>
            <li><a href="#" className="menu-text">text2</a></li>
            <li><a href="#" className="menu-text">text3</a></li>
            <li><a href="#" className="menu-text">text4</a></li>
          </ul>
        </li>
        <li>
          <a href="#" className="menu-text">공간전환</a>
          <ul>
            <li><a href="#" className="menu-text">text1</a></li>
            <li><a href="#" className="menu-text">text2</a></li>
            <li><a href="#" className="menu-text">text3</a></li>
            <li><a href="#" className="menu-text">text4</a></li>
          </ul>
        </li>
        <li>
          <a href="#" className="menu-text">물건배치</a>
          <ul>
            <li><a href="#" className="menu-text">text1</a></li>
            <li><a href="#" className="menu-text">text2</a></li>
            <li><a href="#" className="menu-text">text3</a></li>
            <li><a href="#" className="menu-text">text4</a></li>
          </ul>
        </li>
        <li>
          <a href="#" className="menu-text">가구배치</a>
          <ul>
            <li><a href="#" className="menu-text">text1</a></li>
            <li><a href="#" className="menu-text">text2</a></li>
            <li><a href="#" className="menu-text">text3</a></li>
            <li><a href="#" className="menu-text">text4</a></li>
          </ul>
        </li>
      </ul>
      <div className="side-bar__logout-button">
        <button className="Btn">
          <div className="sign">
            <svg viewBox="0 0 512 512">
              <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path>
            </svg>
          </div>
          <div className="text">Logout</div>
        </button>
      </div>
    </aside>
  );
};

export default SidebarComponent;
