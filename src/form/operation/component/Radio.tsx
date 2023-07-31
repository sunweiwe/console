import { Col, Radio, Row } from "antd";
import React from "react";

type Props = {
  title: string;
  column: string;
  value: string;
  data: any[];
  changeColumnParams: (key: string, value: string) => void;
};

function BaseInput(props: Props) {
  const { title, column, value, changeColumnParams, data = [] } = props;

  return (
    <Row align='middle' style={{ margin: "0 0 15px 0" }}>
      <Col span={24}>{title}</Col>
      <Col span={24}>
        <Radio.Group
          style={{ width: "100%" }}
          onChange={(e) => changeColumnParams(column, e.target.value)}
          value={value}
          optionType='button'
          buttonStyle='solid'
        >
          {data.map((item) => {
            return (
              <Radio.Button key={item.value} value={item.value}>
                {item.label}
              </Radio.Button>
            );
          })}
        </Radio.Group>
      </Col>
    </Row>
  );
}

export default React.memo(BaseInput);
