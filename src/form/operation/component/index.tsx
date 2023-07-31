import React, { lazy } from 'react';
import './index.less';

import { Props } from './type';

const Select = lazy(() => import('./Select'));
const Input = lazy(() => import('./Input'));
const Number = lazy(() => import('./Number'));
const Switch = lazy(() => import('./Switch'));

interface opComponentProp {
  [propName: string]: any;
}

export const operationComponent: opComponentProp = {
  input: (props: Props) => <Input {...props} />,
  select: (props: Props) => <Select {...props} />,
  number: (props: Props) => <Number {...props} />,
  switch: (props: Props) => <Switch {...props} />,
};
