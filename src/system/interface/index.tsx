import React, { useEffect, useReducer } from 'react';
import { Button, Input, Row, Space, Table, Form, Drawer, Select, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { fetchInterfaces, Interfaces } from 'Src/store/reducers/interfaceSlice';
import moment from 'moment';
import { createInterfaces, updateInterfaces, removeInterfaces } from 'Src/service/interfaces';

import CustomButton from 'Src/component/button/index';

const { Option } = Select;
const { TextArea } = Input;
const method = [
  {
    key: 'GET',
    value: 'GET',
  },
  {
    key: 'POST',
    value: 'POST',
  },
  {
    key: 'PUT',
    value: 'PUT',
  },
  {
    key: 'DELETE',
    value: 'DELETE',
  },
  {
    key: 'PATCH',
    value: 'PATCH',
  },
  {
    key: 'HEAD',
    value: 'HEAD',
  },
  {
    key: 'OPTIONS',
    value: 'OPTIONS',
  },
  {
    key: 'TRACE',
    value: 'TRACE',
  },
  {
    key: 'CONNECT',
    value: 'CONNECT',
  },
  {
    key: 'ALL',
    value: 'ALL',
  },
];

function CustomForm({ initialValues, patch, type }: any) {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const handleSubmit = () => {
    form.validateFields().then(async values => {
      try {
        if (type === 'create') {
          await createInterfaces(values);
          message.success('创建成功');
        }
        if (type === 'update') {
          await updateInterfaces({ ...values, id: initialValues.id });
          dispatch(fetchInterfaces({ current: 1, pageSize: 10 }));
          message.success('更新成功');
        }
        patch({ type: 'close' });
      } catch (e: any) {
        message.error(e.data.message);
      }
    });
  };

  return (
    <Form form={form} labelCol={{ span: 4 }} initialValues={initialValues}>
      <Form.Item label='名称' name='name'>
        <Input />
      </Form.Item>
      <Form.Item label='路径' name='path'>
        <Input />
      </Form.Item>
      <Form.Item label='方法' name='method'>
        <Select>
          {method.map(item => (
            <Option key={item.key} value={item.value}>
              {item.value}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item label='备注' name='description'>
        <TextArea rows={4} />
      </Form.Item>
      <Form.Item>
        <Row justify='center'>
          <Space>
            <Button type='primary' ghost onClick={() => patch({ type: 'close' })}>
              取消
            </Button>
            <Button type='primary' onClick={handleSubmit}>
              确定
            </Button>
          </Space>
        </Row>
      </Form.Item>
    </Form>
  );
}

const initial = {
  type: 'create',
  initialValues: {},
  visible: false,
};

const reducer = (state: any, action: { type: string; payload?: any }) => {
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
    default:
      return state;
  }
};

function Interface() {
  const dispatch = useDispatch();
  const interfaces = useSelector(Interfaces);
  const [state, patch] = useReducer(reducer, initial);

  useEffect(() => {
    dispatch(fetchInterfaces({ current: 1, pageSize: 10 }));
  }, [dispatch]);

  const columns = [
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '路径',
      dataIndex: 'path',
      key: 'path',
    },
    {
      title: '方法',
      dataIndex: 'method',
      key: 'method',
    },
    {
      title: '备注',
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
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      width: 200,
      render: (_text: any, record: any) => (
        <Space>
          <Button type='primary' onClick={() => patch({ type: 'update', payload: record })}>
            编辑
          </Button>
          <CustomButton onClick={() => handleRemove(record)}>删除</CustomButton>
        </Space>
      ),
    },
  ];

  const handleRemove = async (record: any) => {
    try {
      await removeInterfaces({
        id: record.id,
      });
      dispatch(fetchInterfaces({ current: 1, pageSize: 10 }));
      message.success('删除成功');
    } catch (e: any) {
      message.error(e.data.message);
    }
  };

  return (
    <div className='user'>
      <Row justify='end' align='middle' style={{ margin: '0 0 20px 0' }}>
        <Form layout='inline'>
          <Form.Item label='名称' name='name'>
            <Input />
          </Form.Item>
        </Form>
        <Space>
          <Button type='primary'>查询</Button>
          <Button type='primary' ghost>
            重置
          </Button>
          <Button type='primary' onClick={() => patch({ type: 'create' })}>
            新增
          </Button>
        </Space>
      </Row>
      <Table
        bordered
        dataSource={interfaces.data}
        pagination={{
          current: interfaces.current,
          pageSize: interfaces.pageSize,
          total: interfaces.total,
          onChange: (page: number) => {
            dispatch(fetchInterfaces({ current: page, pageSize: 10 }));
          },
        }}
        columns={columns}
        rowKey={row => row.id}
      />
      <Drawer
        visible={state.visible}
        onClose={() => patch({ type: 'close' })}
        width={600}
        title='新增接口'
        destroyOnClose={true}
      >
        <CustomForm initialValues={state.initialValues} type={state.type} patch={patch} />
      </Drawer>
    </div>
  );
}

export default Interface;
