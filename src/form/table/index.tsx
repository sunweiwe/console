import React, { Suspense, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { formDataRemove, queryForm, queryFormTable } from 'Src/service/form';
import { Button, Space, Spin, Table } from 'antd';
import { useQuery } from 'react-query';

import tableRender from '../component/tableRender';

import './index.less';

function FormTable() {
  const { id } = useParams() as any;
  const history = useNavigate();
  const [pagination, setPagination] = useState({
    current: 1,
    total: 0,
    pageSize: 10,
  });
  const { data, isLoading, refetch }: any = useQuery(
    ['queryFormTable', pagination],
    () => queryFormTable(pagination, { id: Number.parseInt(id, 10) })
  );
  const { data: formParams, isLoading: load } = useQuery('queryForm', () =>
    queryForm(id)
  ) as any;

  if (isLoading || load) {
    return <Spin spinning />;
  }

  const handleEdit = (record: any) => {
    history(`/form/data?edit=${true}&dataKey=${record.id}&id=${id}`);
  };

  const columns = formParams.data.columns.map((column: any) => {
    return {
      title: column.name,
      dataIndex: column.column,
      key: column.column,
      render: (text = '', record = {}) => (
        <Suspense fallback={<Spin />}>
          {tableRender(column, text, record)}
        </Suspense>
      ),
    };
  });

  const handleRemove = async (record: any) => {
    await formDataRemove(id, record.id);
    refetch();
  };

  const operation = {
    title: '操作',
    key: '操作',
    width: 300,
    render: (text: any, record: any) => (
      <Space size='middle'>
        <Button size='middle' danger onClick={() => handleRemove(record)}>
          删除
        </Button>
        <Button size='middle' type='primary' onClick={() => handleEdit(record)}>
          编辑
        </Button>
      </Space>
    ),
  };

  columns.push(operation);

  const onChange = (page: number) => {
    setPagination({
      ...pagination,
      current: page,
    });
  };

  return (
    <div className='form-table'>
      <div className='header'>
        <div className='title'>{formParams.data?.name}</div>
        <Button
          style={{ width: 80 }}
          type='primary'
          onClick={() => history(`/form/data?id=${id}`)}
        >
          新增
        </Button>
      </div>
      <Table
        pagination={{ ...pagination, total: data.total, onChange }}
        style={{ minWidth: 800 }}
        columns={columns as any}
        dataSource={data?.data.data}
        bordered
      />
    </div>
  );
}

export default FormTable;
