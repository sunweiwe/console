import React, { lazy, Suspense, useEffect, useReducer, useState } from 'react';
import { Button, Input, Row, Space, Table, Form, Drawer, message, Spin } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRoles, Roles } from 'Src/store/reducers/roleSlice';
import moment from 'moment';
import { createRole } from 'Src/service/role';

const Permission = lazy(() => import('../permission/index'));

type State = {
  role: {
    visible: boolean;
    data: any;
    type: string;
  };
  permission: {
    visible: boolean;
    data: any;
  };
};

const initial: State = {
  role: {
    visible: false,
    type: '',
    data: {},
  },
  permission: {
    visible: false,
    data: {},
  },
};

const reducer = (state: State, action: { type: string; payload?: any }) => {
  switch (action.type) {
    case 'roleCreate':
      return { ...state, role: { data: {}, visible: true, type: 'create' } };
    case 'roleUpdate':
      return {
        ...state,
        role: { data: action.payload, visible: true, type: 'update' },
      };
    case 'close':
      return {
        ...state,
        role: { data: {}, visible: false, type: '' },
        permission: { visible: false, data: {} },
      };
    case 'permission':
      return { ...state, permission: { visible: true, data: action.payload } };
    default:
      return state;
  }
};

function Role() {
  const dispatch = useDispatch();
  const roles = useSelector(Roles);
  const [form] = Form.useForm();
  const [state, patch] = useReducer(reducer, initial);

  useEffect(() => {
    dispatch(fetchRoles({ current: 1, pageSize: 10 }));
  }, [dispatch]);

  const handleSubmit = () => {
    form.validateFields().then(async values => {
      try {
        await createRole(values);
        message.success('创建成功');
        dispatch(fetchRoles({ current: 1, pageSize: 10 }));
      } catch (e: any) {
        message.error(e.message);
      }
      patch({
        type: 'close',
      });
    });
  };

  const handlePermission = (record: any) => {
    patch({
      type: 'permission',
      payload: record,
    });
  };

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
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (text: string) => moment(text).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: '修改时间',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      render: (text: string) => moment(text).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      width: 200,
      render: (_text: string, record: any) => (
        <Space>
          <Button type='primary'>编辑</Button>
          <Button type='primary' danger>
            删除
          </Button>
          <Button type='primary' onClick={() => handlePermission(record)}>
            权限设置
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className='user'>
      <Row justify='end' align='middle' style={{ margin: '0 0 20px 0' }}>
        <Form layout='inline'>
          <Form.Item label='角色名称' name='name'>
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
            onClick={() =>
              patch({
                type: 'roleCreate',
              })
            }
          >
            新增
          </Button>
        </Space>
      </Row>
      <Table
        bordered
        dataSource={roles.data}
        pagination={{
          current: roles.current,
          pageSize: roles.pageSize,
          total: roles.total,
        }}
        rowKey={(record: any) => record.id}
        columns={columns}
      />

      <Drawer
        visible={state.role.visible || state.permission.visible}
        onClose={() => patch({ type: 'close' })}
        width={600}
        title={state.role.visible ? '新增角色' : state.permission.visible ? '权限设置' : ''}
        destroyOnClose
      >
        {state.role.visible && (
          <Form
            labelCol={{
              span: 6,
            }}
            form={form}
          >
            <Form.Item
              label='角色名称'
              rules={[
                {
                  required: true,
                  message: '请输入角色名称',
                },
              ]}
              name='name'
            >
              <Input placeholder='请输入角色名称' />
            </Form.Item>
            <Form.Item
              label='角色描述'
              rules={[
                {
                  required: true,
                  message: '请输入角色描述',
                },
              ]}
              name='description'
            >
              <Input.TextArea placeholder='请输入角色描述' />
            </Form.Item>
            <Form.Item>
              <Row justify='center'>
                <Space>
                  <Button type='primary' onClick={handleSubmit}>
                    确定
                  </Button>
                  <Button
                    type='primary'
                    ghost
                    onClick={() =>
                      patch({
                        type: 'close',
                      })
                    }
                  >
                    取消
                  </Button>
                </Space>
              </Row>
            </Form.Item>
          </Form>
        )}
        {state.permission.visible && (
          <Suspense fallback={<Spin spinning />}>
            <Permission data={state.permission.data} />
          </Suspense>
        )}
      </Drawer>
    </div>
  );
}

export default Role;
