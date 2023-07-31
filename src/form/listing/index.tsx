import { Button, Space, Spin } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { queryFormListing, removeForm } from 'Src/service/form';
import { useQuery } from 'react-query';

import './index.less';

async function handleRemove(id: string) {
  const { data } = await removeForm(id);
}

function Listing() {
  const { data: dataSource, isLoading } = useQuery('queryFormListing', () =>
    queryFormListing({})
  );
  const history = useNavigate();

  if (isLoading) {
    return <></>;
  }

  const { data } = dataSource as any;

  return (
    <div className='form-listing'>
      <div className='header'>
        <div>表单</div>
        <Button type='primary' onClick={() => history('/form/config')}>
          创建表单
        </Button>
      </div>
      <div className='layout'>
        <div className='menu'>
          <div className='info' />
        </div>
        <div className='content'>
          {data?.map((item: any) => {
            return (
              <div className='card' key={item.id}>
                <div>
                  <div> {item.name}</div>
                  <div style={{ fontSize: 16 }}>{item.description}</div>
                </div>
                <Space>
                  <Button
                    type='primary'
                    onClick={() => history(`/form/table/${item.id}`)}
                  >
                    列表
                  </Button>
                  <Button
                    type='primary'
                    danger
                    onClick={() => handleRemove(item.id)}
                  >
                    删除
                  </Button>
                  <Button
                    type='primary'
                    onClick={() => history(`/form/config?id=${item.id}`)}
                  >
                    编辑
                  </Button>
                </Space>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Listing;
