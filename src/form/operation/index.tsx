import React, { useCallback } from 'react';
import { Tabs } from 'antd';
import { useSelector, useDispatch } from 'react-redux';

// store
import {
  updateConfig,
  fetchTableName,
  fetchTableStruct,
} from '../../store/reducers/formSlice';

// component
import Base from './column';
import BaseInput from './component/Input';
import BaseRadio from './component/Radio';
import BaseSelect from './component/Select';

// types
import { Form } from '../types';
import { LabelTypes, SizeTypes, DataSourceType } from '../types/constant';

// style
import './index.less';

const { TabPane } = Tabs;

function Operation() {
  const form: Form = useSelector((state: any) => state.form);
  const { config, currentColumn, tables } = form;

  const dispatch = useDispatch();

  const getTableNames = useCallback(
    async (value?: any) => {
      if (value !== '1') {
        return;
      }

      if (tables.length > 0) {
        return;
      }

      dispatch(fetchTableName());
    },
    [dispatch, tables.length]
  );

  const getTableStruct = useCallback(
    (value?: any) => {
      dispatch(fetchTableStruct(value));
    },
    [dispatch]
  );

  const changeColumnParams = useCallback(
    (key: string, value: any) => {
      switch (key) {
        case 'dataSourceType':
          getTableNames(value);
          break;
        case 'tablename':
          getTableStruct(value);
          break;
        default:
          break;
      }

      dispatch(
        updateConfig({
          [key]: value,
        })
      );
    },
    [dispatch, getTableNames, getTableStruct]
  );

  return (
    <div className='form-operation'>
      <Tabs type='line'>
        <TabPane tab='组件属性' key='1'>
          {currentColumn && <Base />}
        </TabPane>
        <TabPane tab='表单属性' key='2'>
          <BaseInput
            title='描述'
            column='description'
            changeColumnParams={changeColumnParams}
            value={config?.description}
          />
          <BaseSelect
            title='数据来源'
            column='dataSourceType'
            data={DataSourceType}
            changeColumnParams={changeColumnParams}
            value={config?.dataSourceType}
          />
          {config?.dataSourceType === '1' && (
            <BaseSelect
              title='表名'
              column='tablename'
              data={tables}
              changeColumnParams={changeColumnParams}
              value={config?.tablename}
            />
          )}
          <BaseRadio
            title='表单尺寸'
            column='size'
            data={SizeTypes}
            changeColumnParams={changeColumnParams}
            value={config?.size}
          />
          <BaseRadio
            title='标签对齐'
            column='labelAlgin'
            data={LabelTypes}
            changeColumnParams={changeColumnParams}
            value={config?.labelAlgin}
          />
        </TabPane>
      </Tabs>
    </div>
  );
}

export default React.memo(Operation);
