import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateBlock } from '../../store/reducers/formSlice';

import { Form, ColumnType } from '../types';
import { opBaseProps, opProps } from '../types/constant';
import { operationComponent } from './component/index';

function Operation() {
  const form: Form = useSelector((state: any) => state.form);
  const { currentColumn, config, fields } = form;
  const column =
    (config.columns.find(
      (item: any) => item.id === currentColumn
    ) as ColumnType) || {};
  const dispatch = useDispatch();

  const changeColumnParams = useCallback(
    (key: string, value: any) => {
      dispatch(
        updateBlock({
          [key]: value,
        })
      );
    },
    [dispatch]
  );

  return (
    <>
      {opBaseProps.map(op => {
        if (op.field === 'column')
          op.type = config.dataSourceType === '0' ? 'input' : 'select';

        if (operationComponent[op.type]) {
          return operationComponent[op.type]({
            title: op.title,
            changeColumnParams,
            column: op.field,
            value: column[op?.field],
            data: fields,
          });
        }
        return '';
      })}

      {opProps[column.type]?.map(op => {
        if (operationComponent[op.type]) {
          return operationComponent[op.type]({
            title: op.title,
            changeColumnParams,
            column: op.field,
            value: column[op.field],
            data: op.data || fields,
            type: op.type,
            config: column,
          });
        }
        return '';
      })}
    </>
  );
}

export default Operation;
