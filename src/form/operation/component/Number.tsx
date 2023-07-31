import { Col, InputNumber, Row } from "antd";
import React from "react";

type Props = {
  title: string;
  column: string;
  value?: string;
  changeColumnParams: (key: string, value: string) => void;
};

function Number(props: Props) {
  const { title, column, value, changeColumnParams } = props;

  return (
    <Row align='middle' style={{ margin: "0 0 15px 0" }}>
      <Col span={24}>{title}</Col>
      <Col span={24}>
        <InputNumber style={{ width: "100%" }} onChange={(e) => changeColumnParams(column, e)} value={value || ""} />
      </Col>
    </Row>
  );
}

export default React.memo(Number);
