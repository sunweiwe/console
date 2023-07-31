import React, { useEffect, useReducer, useState } from 'react';
import { Button, Input, Row, Space, Table, Form, Drawer, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, Users } from 'Src/store/reducers/userSlice';
import moment from 'moment';
import CustomButton from 'Src/component/button/index';

import { createUser, updateUser, getRoleForUser } from 'Src/service/system';

const UserForm = ({ state, patch, dispatch }: any) => {
  const [form] = Form.useForm();
  const handleSubmit = () => {
    form.validateFields().then(async (values: any) => {
      try {
        if (state.type === 'create') {
          await createUser(values);
        }
        if (state.type === 'update') {
          await updateUser({ ...state.initialValues, ...values });
        }
        message.success('提交成功！');
        dispatch(fetchUsers({ current: 1, pageSize: 10 }));
        patch({
          type: 'close',
        });
      } catch (err: any) {
        message.error(err.data.message);
      }
    });
  };

  return (
    <Form form={form} initialValues={state.initialValues} labelCol={{ span: 4 }}>
      <Form.Item label='用户名' name='username'>
        <Input />
      </Form.Item>
      <Form.Item label='手机号' name='mobile'>
        <Input />
      </Form.Item>
      <Form.Item label='昵称' name='nickname'>
        <Input />
      </Form.Item>
      <Form.Item>
        <Row justify='center'>
          <Space>
            <Button type='primary' onClick={() => patch({ type: 'close' })} ghost>
              取消
            </Button>
            <Button type='primary' onClick={handleSubmit}>
              提交
            </Button>
          </Space>
        </Row>
      </Form.Item>
    </Form>
  );
};

function RoleTable({ param }: any) {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    async function fetchData() {
      const { data } = await getRoleForUser({
        organization: 'default',
        id: param.id,
      });

      setData(data);
    }

    if (param.id) {
      fetchData();
    }
  }, [param.id]);

  const columns = [
    {
      title: '角色名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '角色描述',
      dataIndex: 'description',
      key: 'description',
    },
  ];

  return <Table dataSource={data} columns={columns} />;
}

const initial = {
  type: '',
  initialValues: '',
  visible: false,
  role: {
    visible: false,
    param: {},
  },
};

function reducer(state: any, action: any) {
  switch (action.type) {
    case 'create':
      return {
        ...state,
        visible: true,
        type: 'create',
        initialValues: '',
      };
    case 'update':
      return {
        ...state,
        visible: true,
        type: 'update',
        initialValues: action.payload,
      };
    case 'close':
      return {
        ...state,
        visible: false,
        type: '',
        initialValues: '',
      };
    case 'role':
      return {
        ...state,
        role: {
          visible: true,
          param: action.payload,
        },
      };
    case 'roleClose':
      return {
        ...state,
        role: {
          visible: false,
          param: {},
        },
      };
    default:
      return state;
  }
}

function User() {
  const dispatch = useDispatch();
  const users = useSelector(Users);
  const [state, patch] = useReducer(reducer, initial);

  useEffect(() => {
    dispatch(fetchUsers({ current: 1, pageSize: 10 }));
  }, [dispatch]);

  const columns = [
    {
      title: '用户名',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: '密码',
      dataIndex: 'password',
      key: 'password',
    },
    {
      title: '手机号',
      dataIndex: 'mobile',
      key: 'mobile',
    },
    {
      title: '昵称',
      dataIndex: 'nickname',
      key: 'nickname',
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (text: string) => moment(text).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      render: (_text: any, record: any) => (
        <Space>
          <Button
            type='primary'
            onClick={() =>
              patch({
                type: 'update',
                payload: record,
              })
            }
          >
            编辑
          </Button>
          <CustomButton>删除</CustomButton>
          <Button
            type='primary'
            onClick={() =>
              patch({
                type: 'role',
                payload: record,
              })
            }
          >
            查看角色
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className='user'>
      <Row justify='end' align='middle' style={{ margin: '0 0 20px 0' }}>
        <Form layout='inline'>
          <Form.Item label='用户名' name='username'>
            <Input />
          </Form.Item>
        </Form>
        <Space>
          <Button type='primary'>查询</Button>
          <Button type='primary' ghost>
            重置
          </Button>
          <Button
            type='primary'
            onClick={() => {
              patch({ type: 'create' });
            }}
          >
            新增
          </Button>
        </Space>
      </Row>
      <Table
        bordered
        dataSource={users.data}
        pagination={{
          current: users.current,
          pageSize: users.pageSize,
          total: users.total,
        }}
        rowKey='id'
        columns={columns}
      />
      <Drawer
        visible={state.visible}
        onClose={() => patch({ type: 'close' })}
        width={600}
        title={state.type === 'create' ? '新增用户' : '编辑用户'}
        destroyOnClose={true}
      >
        <UserForm state={state} dispatch={dispatch} patch={patch} />
      </Drawer>
      <Drawer
        visible={state.role.visible}
        onClose={() => patch({ type: 'roleClose' })}
        width={600}
        title={`角色分配(用户：${state.role.param.username})`}
        destroyOnClose={true}
      >
        <RoleTable param={state.role.param} />
      </Drawer>
    </div>
  );
}

export default User;
