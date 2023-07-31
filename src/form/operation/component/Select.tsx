import { Col, Select, Row, Input, Space, Button } from 'antd';
import React, { useState } from 'react';
import Icon from 'Src/component/icon';
import LinkModal from './component/modal';

import { Props } from './type';

type IProps = {
  title: string;
  column: string;
  value?: string;
  data?: any[];
  changeColumnParams: (key: string, value: string) => void;
};

type UProps = IProps & Omit<Props, 'changeColumnParams'>;

function DataSource({ config, changeColumnParams }: any) {
  const data = config.dataSource || '[]';
  const [visible, setVisible] = useState(false);
  const dataSource = JSON.parse(data);

  const handleAdd = () => {
    dataSource.push({
      label: `选项${dataSource.length + 1}`,
      value: dataSource.length + 1,
    });

    changeColumnParams('dataSource', JSON.stringify(dataSource));
  };

  const handleRemove = (index: number) => {
    dataSource.splice(index, 1);
    changeColumnParams('dataSource', JSON.stringify(dataSource));
  };

  return (
    <div style={{ margin: '20px 0 0 0', width: '100%' }}>
      <Row>
        <Col span={9}>标签</Col>
        <Col span={9}>值</Col>
      </Row>
      {dataSource?.map((item: any, index: number) => {
        return (
          <Space
            className='flex'
            style={{ margin: '10px 0 0 0', width: '100%' }}
            key={item.value + item.label}
          >
            <Input value={item.label} />
            <Input value={item.value} />
            <Icon
              icon='iconchangyong_cuowu'
              style={{ color: 'red', fontSize: '20px' }}
              onClick={() => handleRemove(index)}
            />
          </Space>
        );
      })}
      <Row>
        <Button type='link' onClick={handleAdd}>
          添加选项
        </Button>
      </Row>
      <Button
        type='primary'
        onClick={() => setVisible(true)}
        style={{ width: '100%', margin: '10px 0 0 0' }}
      >
        选项关联
      </Button>
      {config.dataSourceType === '3' && (
        <Button type='primary' style={{ width: '100%', margin: '10px 0 0 0' }}>
          数据关联
        </Button>
      )}
      {visible && (
        <LinkModal
          changeColumnParams={changeColumnParams}
          dataSource={dataSource}
          setVisible={setVisible}
          config={config}
        />
      )}
    </div>
  );
}

function FieldSelect(props: UProps) {
  const {
    title,
    column,
    value = '',
    changeColumnParams,
    data = [],
    type,
    config,
  } = props;

  return (
    <Row
      align='middle'
      className={`operation-select-${column}`}
      style={{ margin: '0 0 15px 0' }}
    >
      <Col span={24}>{title}</Col>
      <Col span={24}>
        <Select
          style={{ width: '100%' }}
          onChange={e => changeColumnParams(column, e)}
          value={value}
        >
          {data.map(item => {
            return (
              <Select.Option
                key={item.Field || item.value}
                value={item.Field || item.value}
              >
                {item.Field ? item.Field : item.label}
              </Select.Option>
            );
          })}
        </Select>
      </Col>
      {type === 'select' && (
        <DataSource changeColumnParams={changeColumnParams} config={config} />
      )}
    </Row>
  );
}

export default React.memo(FieldSelect);
