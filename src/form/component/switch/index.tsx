import React from 'react';

import { Form, Switch as AntSwitch } from 'antd';

import { ColumnType } from '../../types';

function Switch({
  column,
  initialValues,
}: {
  column: ColumnType;
  initialValues: Record<string, any>;
}) {
  return (
    <Form.Item label={column.name} name={column.column}>
      <AntSwitch
        defaultChecked={initialValues[column.column]}
        checkedChildren={column.checkedChildren}
        unCheckedChildren={column.unCheckedChildren}
      />
    </Form.Item>
  );
}

export default Switch;
