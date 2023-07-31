import React from 'react';

import { Form, Input as AntInput, InputProps } from 'antd';

import { ColumnType } from '../../types';

function TextArea({
  column,
  initialValues,
}: {
  column: ColumnType & InputProps;
  initialValues: Record<string, any>;
}) {
  return (
    <Form.Item
      label={column.name}
      name={column.column}
      initialValue={initialValues[column.column]}
    >
      <AntInput.TextArea
        rows={column.rows}
        placeholder={column.placeholder}
        maxLength={column.maxLength}
        showCount={column.showCount as any}
        disabled={column.disabled}
      />
    </Form.Item>
  );
}

export default TextArea;
