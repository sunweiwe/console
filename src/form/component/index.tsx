import React, { lazy } from 'react';
import { ColumnType } from '../types';

const Input = lazy(() => import('./input'));
const Number = lazy(() => import('./number'));
const TextArea = lazy(() => import('./textArea'));
const Switch = lazy(() => import('./switch'));
const Rate = lazy(() => import('./rate'));
const Select = lazy(() => import('./select'));

export const formRender = (column: ColumnType, initialValues = {}) => {
  switch (column.type) {
    case 'input':
      return (
        <Input key={column.id} column={column} initialValues={initialValues} />
      );
    case 'number':
      return (
        <Number key={column.id} column={column} initialValues={initialValues} />
      );
    case 'textArea':
      return (
        <TextArea
          key={column.id}
          column={column}
          initialValues={initialValues}
        />
      );
    case 'switch':
      return (
        <Switch key={column.id} column={column} initialValues={initialValues} />
      );
    case 'rate':
      return (
        <Rate key={column.id} column={column} initialValues={initialValues} />
      );
    case 'select':
      return (
        <Select key={column.id} column={column} initialValues={initialValues} />
      );
    default:
      return (
        <Input key={column.id} column={column} initialValues={initialValues} />
      );
  }
};
