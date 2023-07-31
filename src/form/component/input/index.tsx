import React from 'react';

import { Form, Input as AntInput, InputProps } from 'antd';

import { ColumnType } from '../../types';

function Input({
  column,
  initialValues,
}: {
  column: ColumnType & InputProps;
  initialValues: Record<string, any>;
}) {
  return (
    <Form.Item
      initialValue={initialValues[column.column]}
      label={column.name}
      name={column.column}
    >
      <AntInput
        placeholder={column.placeholder}
        disabled={column.disabled}
        maxLength={column.maxLength}
        suffix={column.suffix}
        prefix={column.prefix}
      />
    </Form.Item>
  );
}

export default Input;
