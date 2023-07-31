import React, { useEffect, useState } from 'react';
import { Button, Input, Row, Space, Table, Form, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import DebounceSelect from 'Src/component/select/index';
import { getInterfaces } from 'Src/service/interfaces';
import { fetchPermission } from 'Src/store/reducers/permission';
import { updatePermission } from 'Src/service/permission';

const { TextArea } = Input;

async function fetchOptions(value: string) {
  const { data } = await getInterfaces({
    current: 1,
    pageSize: 10,
    name: value,
  });
  return data?.data || [];
}

function Permission({ data }: any) {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const dataSource = useSelector((state: any) => state.permission.data);

  useEffect(() => {
    dispatch(fetchPermission({ organization: 'default', role: data.id }));
  }, []);

  const handleSubmit = () => {
    form.validateFields().then(async values => {
      try {
        await updatePermission({
          ...values,
          organization: 'default',
          role: data.id,
          related: values.id,
        });
        dispatch(fetchPermission({ organization: 'default', role: data.id }));
        setVisible(false);
      } catch (e: any) {
        message.error(e.message);
      }
    });
  };

  const columns = [
    {
      title: '接口名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '接口路径',
      dataIndex: 'path',
      key: 'path',
    },
    {
      title: '方法',
      dataIndex: 'method',
      key: 'method',
    },

    {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      width: '20%',
      render: () => (
        <Button type='primary' danger>
          删除
        </Button>
      ),
    },
  ];

  return (
    <>
      {!visible && (
        <div className='permission'>
          <Row justify='space-between' align='middle' style={{ margin: '0 0 20px 0' }}>
            <Form layout='inline'>
              <Form.Item label='权限名称' name='name'>
                <Input />
              </Form.Item>
            </Form>
            <Space>
              <Button type='primary'>查询</Button>
              <Button type='primary' ghost>
                重置
              </Button>
              <Button type='primary' onClick={() => setVisible(true)}>
                新增
              </Button>
            </Space>
          </Row>
          <Table
            bordered
            dataSource={dataSource}
            pagination={{
              total: dataSource.length,
              pageSize: 10,
            }}
            rowKey={(record: any) => record.path + record.method}
            columns={columns}
          />
        </div>
      )}
      {visible && (
        <Form
          labelCol={{
            span: 6,
          }}
          form={form}
        >
          <Form.Item
            label='接口名称'
            rules={[
              {
                required: true,
                message: '请输入接口名称',
              },
            ]}
            name='id'
          >
            <DebounceSelect form={form} fetchOptions={fetchOptions} />
          </Form.Item>
          <Form.Item
            label='路径'
            rules={[
              {
                required: true,
                message: '请输入路径',
              },
            ]}
            name='path'
          >
            <Input disabled placeholder='请输入路径' />
          </Form.Item>
          <Form.Item
            label='方法'
            rules={[
              {
                required: true,
                message: '请输入方法',
              },
            ]}
            name='method'
          >
            <Input disabled placeholder='请输入方法' />
          </Form.Item>
          <Form.Item
            label='备注'
            rules={[
              {
                required: true,
                message: '请输入备注',
              },
            ]}
            name='description'
          >
            <TextArea disabled rows={4} placeholder='请输入备注' />
          </Form.Item>
          <Form.Item>
            <Row justify='center'>
              <Space>
                <Button type='primary' onClick={handleSubmit}>
                  确定
                </Button>
                <Button type='primary' ghost onClick={() => setVisible(false)}>
                  取消
                </Button>
              </Space>
            </Row>
          </Form.Item>
        </Form>
      )}
    </>
  );
}

export default Permission;
