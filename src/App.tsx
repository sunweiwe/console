import React, { Suspense, useEffect } from 'react';
import { Spin, Layout } from 'antd';
import Router from 'Src/routes/index';
import { useNavigate } from 'react-router-dom';

function App() {
  const history = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (!token) {
      history('/login');
    }
  }, []);

  return (
    <Suspense
      fallback={
        <Layout className='flex justify-center h-full'>
          <Spin spinning={true} />
        </Layout>
      }
    >
      <Router />
    </Suspense>
  );
}

export default App;
