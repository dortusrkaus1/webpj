import React from 'react';
import HeaderComponent from '../components/HeaderComponent/HeaderComponent';
import '../components/HeaderComponent/HeaderComponent.css';
import logo from '../pages/image/sunab.png'; // 로고 이미지 import

export default {
  title: 'Components/HeaderComponent',
  component: HeaderComponent,
};

const Template = (args) => <HeaderComponent {...args} />;

export const Default = Template.bind({});
Default.args = {
  logoSrc: logo, // 위에서 import한 로고 경로를 사용
  placeholderText: '검색어를 입력하세요',
  onSearch: (query) => console.log('검색어:', query),
};
