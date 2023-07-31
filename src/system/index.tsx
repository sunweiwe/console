import React, { Suspense, useEffect } from 'react';
import { Layout, Menu, Spin } from 'antd';
import { Link, Outlet, useNavigate } from 'react-router-dom';

import './index.less';

const { Content, Sider } = Layout;

const menus = [
  {
    key: '1',
    path: '/system/user',
    name: '用户管理',
  },
  {
    key: '2',
    path: '/system/role',
    name: '角色管理',
  },
  {
    key: '3',
    path: '/system/interface',
    name: '接口管理',
  },
];

function System() {
  const [selectedKeys, setSelectedKeys] = React.useState(['']);
  const history = useNavigate();

  useEffect(() => {
    const url = window.location.href.split('?')[0];
    const [item] = menus.filter(item => url.indexOf(item.path) > -1);

    if (!item) {
      history('/system/user');
    }
    setSelectedKeys([item?.key || '1']);
  }, []);

  return (
    <Layout className='system'>
      <Sider theme='dark' width={200} className='system-menu'>
        <div className='logo' onClick={() => history('/')} />
        <Menu
          selectedKeys={selectedKeys}
          onSelect={p => setSelectedKeys(p.selectedKeys)}
          theme='dark'
        >
          {menus.map(item => {
            return (
              <Menu.Item key={item.key}>
                <Link to={item.path}>{item.name}</Link>
              </Menu.Item>
            );
          })}
        </Menu>
      </Sider>
      <Content className='system-content'>
        <div style={{ margin: 20, background: 'white', padding: 20 }}>
          <Suspense fallback={<Spin spinning />}>
            <Outlet />
          </Suspense>
        </div>
      </Content>
    </Layout>
  );
}

export default System;
