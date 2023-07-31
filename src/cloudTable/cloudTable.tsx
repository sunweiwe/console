import React, { lazy, useState } from 'react';
import Handsontable from 'handsontable';
import { registerLanguageDictionary, zhCN } from 'handsontable/i18n';
import { Button, Form, Input, Modal, Row, Space } from 'antd';

const HotTable = lazy(() => import('@handsontable/react'));

import './index.less';
import 'handsontable/dist/handsontable.full.css';

type HProps = {
  setVisible: any;
  setColumns: any;
  columns: any;
};

registerLanguageDictionary(zhCN);

function ColHeaders(props: HProps) {
  const { columns, setColumns, setVisible } = props;
  const [form] = Form.useForm();

  return (
    <Modal visible closable={false} footer={null}>
      <Form>
        <Form.Item name='name' label='标题'>
          <Input />
        </Form.Item>
      </Form>
      <Row>
        <Space>
          <Button type='primary'>确认</Button>
          <Button>取消</Button>
        </Space>
      </Row>
    </Modal>
  );
}

function CloudTable() {
  const [visible, setVisible] = useState(false);
  const [columns, setColumns] = useState(Array.from({ length: 20 })) as any;

  // const changHeader = (index: number) => {};

  return (
    <div className='cloud-table'>
      <div className='cloud-table-header'>111</div>
      <div className='cloud-table-operation'>
        <Button onClick={() => setVisible(true)} type='primary'>
          设置表头
        </Button>
      </div>
      <div className='cloud-table-content'>
        <HotTable
          settings={{
            data: Handsontable.helper.createEmptySpreadsheetData(50, 20),
            colHeaders: true,
            rowHeaders(index) {
              if (!index) return ``;
              return `${index}`;
            },
            licenseKey: 'non-commercial-and-evaluation',
            rowHeights: 35, // 每行的高度
            colWidths: 120, // 每列的宽度
            autoColumnSize: true,
            copyable: true, // 开启复制
            comments: true, // 开启备注
            filters: true,
            manualRowMove: true,
            autoWrapRow: true, // 自动换行
            language: 'zh-CN',
            fixedRowsTop: 1,
            manualColumnResize: true,
            contextMenu: ['row_above', 'row_below', 'remove_row'],
            dropdownMenu: true,
            columns,
          }}
        />

        {visible && (
          <ColHeaders
            setVisible={setVisible}
            columns={columns}
            setColumns={setColumns}
          />
        )}
      </div>
    </div>
  );
}

export default CloudTable;
