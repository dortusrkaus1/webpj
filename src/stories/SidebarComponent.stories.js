// SidebarComponent.stories.js
import React from 'react';
import Sidebar from '../components/SidebarComponent/SidebarComponent';
import '../components/SidebarComponent/SidebarComponent.css';

export default {
  title: 'Components/SidebarComponent',
  component: Sidebar,
};

const Template = (args) => <Sidebar {...args} />;

export const Default = Template.bind({});
Default.args = {
  width: 280,
  children: (
    <div>
      <h2>Sidebar Content</h2>
      <p>This is the content inside the sidebar.</p>
    </div>
  ),
};
