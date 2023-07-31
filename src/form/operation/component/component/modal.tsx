import { useSelector } from "react-redux";
import { Button, Modal, Row, Select, Space } from "antd";
import React, { useState } from "react";

const { Option } = Select;

function LinkModal({ dataSource = [], config, setVisible, changeColumnParams }: any) {
  const columns = useSelector((state: any) => state.form.config.columns.filter((i: any) => i.id !== config.id));
  const [mapping, setMapping] = useState(config.linkMapping ? JSON.parse(config.linkMapping) : {}) as any;

  const showChange = (e: any, data: { value: string }) => {
    const result = { ...mapping };

    if (!result[data.value]) {
      result[data.value] = {
        show: [],
        hide: [],
      };
    }
    result[data.value].show = e;
    setMapping(result);
  };

  const hideChange = (e: any, data: { value: string }) => {
    const result = { ...mapping };

    if (!result[data.value]) {
      result[data.value] = {
        show: [],
        hide: [],
      };
    }
    result[data.value].hide = e;
    setMapping(result);
  };

  const handleConfirm = () => {
    changeColumnParams("linkMapping", JSON.stringify(mapping));
    setVisible(false);
  };

  return (
    <Modal title='关联显示' closable={false} footer={null} visible>
      <Space direction='vertical'>
        <Row justify='space-around'>
          <h1 style={{ fontSize: 16 }}>显示</h1>
          <h1 style={{ fontSize: 16 }}>隐藏</h1>
        </Row>
        {dataSource.map((data: any) => {
          return (
            <Row key={data.label}>
              <Space>
                <div style={{ fontSize: 14 }}> {data.label}:</div>
                <Select
                  defaultValue={mapping[data.value]?.show || []}
                  mode='multiple'
                  style={{ width: 200 }}
                  onChange={(e) => showChange(e, data)}
                >
                  {columns
                    .filter((c: any) => {
                      if (mapping[data.value]?.hide.includes(c.id)) {
                        return false;
                      }
                      return true;
                    })
                    .map((c: any) => {
                      return (
                        <Option value={c.id} key={c.id}>
                          {c.name}
                        </Option>
                      );
                    })}
                </Select>
                <Select
                  defaultValue={mapping[data.value]?.hide || []}
                  mode='multiple'
                  style={{ width: 200 }}
                  onChange={(e) => hideChange(e, data)}
                >
                  {columns
                    .filter((c: any) => {
                      if (mapping[data.value]?.show.includes(c.id)) {
                        return false;
                      }
                      return true;
                    })
                    .map((c: any) => {
                      return (
                        <Option value={c.id} key={c.id}>
                          {c.name}
                        </Option>
                      );
                    })}
                </Select>
              </Space>
            </Row>
          );
        })}
        <Row justify='center' style={{ padding: "10px 0" }}>
          <Space>
            <Button type='primary' onClick={handleConfirm}>
              确认
            </Button>
            <Button type='dashed' onClick={() => setVisible(false)}>
              取消
            </Button>
          </Space>
        </Row>
      </Space>
    </Modal>
  );
}

export default LinkModal;
