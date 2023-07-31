import React, { Suspense, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  formData,
  formDataQueryById,
  formDataUpdateById,
} from 'Src/service/form';

import { Button, Form, Row, Space, Spin } from 'antd';
import qs from 'query-string';
import { useSelector, useDispatch } from 'react-redux';
import { fetchForm } from 'Src/store/reducers/formSlice';
import { formRender } from '../component';

import './index.less';

function FormRender() {
  const { dataKey, id } = qs.parse(location.search);
  const formConfig = useSelector((state: any) => state.form.config);
  const hide = useSelector((state: any) => state.form.hide);

  const [form] = Form.useForm();
  const history = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchForm(id as string));
  }, [dispatch, id]);

  const [spinning, setSpinning] = useState(false);
  const [initialValues, setInitialValues] = useState({});

  useEffect(() => {
    if (!dataKey) {
      return;
    }

    async function fetchData() {
      setSpinning(true);
      const { data: res } = await formDataQueryById(
        id as string,
        dataKey as string
      );
      setInitialValues(res);
      setSpinning(false);
    }
    fetchData();
  }, [id, dataKey]);

  const handleConfirm = () => {
    form
      .validateFields()
      .then(async values => {
        try {
          await (dataKey
            ? formDataUpdateById(id as string, dataKey as string, values)
            : formData(id as string, values));
          history(-1);
        } catch (error) {
          console.log(error);
        }
        return null;
      })
      .catch(error => {
        console.log(error);
      });
  };

  const columns = useMemo(
    () =>
      formConfig?.columns.filter((c: any) => {
        if (!hide.hide) {
          return true;
        }

        return !hide.hide.includes(c.id);
      }),
    [formConfig?.columns, hide.hide]
  );

  if (spinning) {
    return <Spin spinning />;
  }

  return (
    <div className='form-render'>
      <div className='header'>{formConfig?.name}</div>
      <div className='content'>
        {formConfig?.columns && (
          <Form
            form={form}
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 12 }}
            size='middle'
          >
            {columns.map((column: any) => {
              return (
                <Suspense fallback={<Spin spinning />}>
                  {formRender(column, initialValues)}
                </Suspense>
              );
            })}
            <Row justify='center'>
              <Space>
                <Button onClick={handleConfirm} type='primary'>
                  提交
                </Button>
                <Button onClick={() => history(-1)}>返回</Button>
              </Space>
            </Row>
          </Form>
        )}
      </div>
    </div>
  );
}

export default FormRender;
