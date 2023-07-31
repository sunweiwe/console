import React, { lazy, Suspense, useEffect } from 'react';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { useSelector, useDispatch } from 'react-redux';
import qs from 'query-string';

import { componentTypeMenu } from 'Src/form/types';
import { updateForm, crateForm } from 'Src/service/form';

// store
import {
  getName,
  updateConfig,
  fetchFormConfig,
} from 'Src/store/reducers/formSlice';

// component
import { Input, Button, Spin } from 'antd';

const Operation = lazy(() => import('../operation'));
const Box = lazy(() => import('./box'));
const Container = lazy(() => import('./container'));

// style
import './index.less';

function Application({ id }: any) {
  const name = useSelector(getName);
  const formParams = useSelector((state: any) => state.form.config);
  const dispatch = useDispatch();

  const onChange = (e: any) => {
    dispatch(
      updateConfig({
        name: e.target.value,
      })
    );
  };

  const handleSubmit = async () => {
    try {
      await (id ? updateForm(formParams) : crateForm(formParams));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='form'>
      <div className='header'>
        <Input
          value={name}
          onChange={onChange}
          style={{ width: '300px' }}
          placeholder='请输入表单名称'
        />
        <Button onClick={handleSubmit} type='primary' style={{ width: 80 }}>
          保存
        </Button>
      </div>
      <div className='content'>
        <div className='form-sider'>
          <div className='form-sider-search'>
            <Input />
          </div>
          <div className='form-sider-content'>
            {componentTypeMenu.map(component => {
              return (
                <Suspense fallback={<Spin spinning />}>
                  <Box key={component.id} component={component} />
                </Suspense>
              );
            })}
          </div>
        </div>
        <div className='form-content'>
          <Suspense fallback={<Spin spinning />}>
            <Container />
          </Suspense>
        </div>
        <Suspense fallback={<Spin spinning />}>
          <Operation key={id as any} />
        </Suspense>
      </div>
    </div>
  );
}

export default React.memo(Application);
