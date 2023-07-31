import React, { lazy } from 'react';
import { ColumnType } from '../types';

const Input = lazy(() => import('./input/table'));
const Number = lazy(() => import('./number/table'));
const TextArea = lazy(() => import('./textArea/table'));
const Switch = lazy(() => import('./switch/table'));
const Rate = lazy(() => import('./rate/table'));
const Select = lazy(() => import('./select/table'));

const tableRender = (column: ColumnType, text: any, record: any) => {
  switch (column.type) {
    case 'input':
      return <Input column={column} text={text} record={record} />;
    case 'number':
      return <Number column={column} text={text} record={record} />;
    case 'textArea':
      return <TextArea column={column} text={text} record={record} />;
    case 'switch':
      return <Switch column={column} text={text} record={record} />;
    case 'rate':
      return <Rate column={column} text={text} record={record} />;
    case 'select':
      return <Select column={column} text={text} record={record} />;
    default:
      return <Input column={column} text={text} record={record} />;
  }
};

export default tableRender;
