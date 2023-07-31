import { Button, Form, Input, message } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { userLogin } from 'Src/service/system';
import md5 from 'md5';
import pic from './login.png';

import './index.less';

function Login() {
  const [form] = Form.useForm();
  const history = useNavigate();

  const onFinish = async (values: any) => {
    try {
      const { data } = await userLogin({
        ...values,
        password: md5(values.password),
      });
      sessionStorage.setItem('token', data.token);
      message.success('登录成功！');
      history('/');
    } catch (err) {}
  };

  return (
    <div className='login'>
      <div className='left'>
        <Form
          form={form}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          size='large'
          onFinish={onFinish}
          autoComplete='off'
        >
          <Form.Item
            label='用户名'
            name='username'
            rules={[{ required: true, message: '请输入用户名！' }]}
          >
            <Input style={{ width: 300 }} />
          </Form.Item>
          <Form.Item
            label='密码'
            name='password'
            rules={[{ required: true, message: '请输入密码！' }]}
          >
            <Input style={{ width: 300 }} type='password' />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type='primary' htmlType='submit'>
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
      <img src={pic} alt='' />
    </div>
  );
}

export default Login;
