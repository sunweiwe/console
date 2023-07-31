import { Col, Input, Row } from "antd";
import React from "react";

type Props = {
  title: string;
  column: string;
  value?: string;
  changeColumnParams: (key: string, value: string) => void;
};

function BaseInput(props: Props) {
  const { title, column, value, changeColumnParams } = props;

  return (
    <Row align='middle' style={{ margin: "0 0 15px 0" }}>
      <Col className='text-left' span={24}>
        {title}
      </Col>
      <Col span={24}>
        <Input onChange={(e) => changeColumnParams(column, e.target.value)} value={value} />
      </Col>
    </Row>
  );
}

export default React.memo(BaseInput);
