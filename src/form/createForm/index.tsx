import React, { lazy, Suspense, useEffect } from 'react';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { useSelector, useDispatch } from 'react-redux';
import qs from 'query-string';

import { componentTypeMenu } from 'Src/form/types';
import { updateForm, crateForm } from 'Src/service/form';

// store
import { getName, updateConfig, fetchFormConfig } from 'Src/store/reducers/formSlice';

import Application from './app';

// component
import { Spin } from 'antd';

// style
import './index.less';
import Layout from 'antd/lib/layout/layout';

function Bucket() {
  const { id = '' } = qs.parse(location.search);
  const name = useSelector(getName);
  const formParams = useSelector((state: any) => state.form.config);
  const dispatch = useDispatch();

  useEffect(() => {
    if (id) {
      dispatch(fetchFormConfig(id as string));
    }
  }, [dispatch, id]);

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

  return <DndProvider backend={HTML5Backend}>{formParams.id && <Application />}</DndProvider>;
}

export default Bucket;
