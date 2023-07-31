import React from 'react';
import { Form, InputNumber, InputNumberProps } from 'antd';
import { ColumnType } from '../../types';

function Number({
  column,
  initialValues,
}: {
  column: ColumnType & InputNumberProps;
  initialValues: Record<string, any>;
}) {
  return (
    <Form.Item
      label={column.name}
      name={column.column}
      initialValue={initialValues[column.column]}
    >
      <InputNumber
        style={{ width: '100%' }}
        max={column.max || ''}
        min={column.min || ''}
        step={column.step}
        placeholder={column.placeholder}
        controls={column.controls}
        readOnly={column.readOnly}
        disabled={column.disabled}
      />
    </Form.Item>
  );
}

export default Number;
