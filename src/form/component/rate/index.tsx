import React from 'react';
import { Form, Rate as AntRate, RateProps } from 'antd';
import { ColumnType } from '../../types';

const regex = new RegExp(',|，');

function Number({
  column,
  initialValues,
}: {
  column: ColumnType & RateProps;
  initialValues: Record<string, any>;
}) {
  const tooltips = (column.tooltips || '') as string;

  return (
    <Form.Item
      label={column.name}
      name={column.column}
      initialValue={initialValues[column.column]}
    >
      <AntRate
        allowHalf={column.allowHalf}
        allowClear={column.allowClear}
        character={column.character || undefined}
        count={column.count || undefined}
        tooltips={tooltips.split(regex)}
      />
    </Form.Item>
  );
}

export default Number;
