import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, Space } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import './index.less';

const menu = [
  {
    name: '表单搭建',
    path: '/form/listing',
  },
  {
    name: '系统设置',
    path: '/system',
  },
  {
    name: '数据资产',
    path: '/cloud/table',
  },
  {
    name: '数据资产',
    path: '/cloud/table',
  },
];

function Home() {
  const history = useNavigate();

  return (
    <div className='home'>
      <div className='home-header'>
        <div className='name'>工作台 ｜ Paas</div>
        <Space>
          <Avatar icon={<UserOutlined />} />
        </Space>
      </div>
      <div className='content'>
        <div className='menu'>
          <Space direction='vertical'>
            {menu.map(item => (
              <div
                className='card cursor-pointer'
                key={item.path}
                onClick={() => history(item.path)}
              >
                {item.name}
              </div>
            ))}
          </Space>
        </div>
      </div>
    </div>
  );
}

export default Home;
