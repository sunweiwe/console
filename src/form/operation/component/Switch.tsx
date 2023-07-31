import { Col, Switch as AntSwitch, Row } from 'antd';
import React from 'react';

type Props = {
  title: string;
  column: string;
  value?: boolean;
  changeColumnParams: (key: string, value: boolean) => void;
};

function Switch(props: Props) {
  const { title, column, value, changeColumnParams } = props;

  return (
    <Row align='middle' style={{ margin: '0 0 15px 0' }}>
      <Col className='text-left' span={24}>
        {title}
      </Col>
      <Col span={24}>
        <AntSwitch
          onChange={e => changeColumnParams(column, e)}
          checked={value}
        />
      </Col>
    </Row>
  );
}

export default React.memo(Switch);
