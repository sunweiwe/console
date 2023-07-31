import React, { useEffect, useMemo, memo } from "react";
import { Form, Select as AntSelect } from "antd";
import { useDispatch } from "react-redux";
import { updateHide } from "Src/store/reducers/formSlice";
import { ColumnType } from "../../types";

const { Option } = AntSelect;

function Select({ column, initialValues }: { column: ColumnType; initialValues: any }) {
  const dispatch = useDispatch();
  const linkMapping = useMemo(() => (column.linkMapping ? JSON.parse(column.linkMapping) : {}), [column.linkMapping]);
  const dataSource = useMemo(() => {
    try {
      return JSON.parse(column.dataSource as string);
    } catch {
      return [];
    }
  }, [column.dataSource]);

  useEffect(() => {
    if (initialValues[column.column]) {
      dispatch(
        updateHide({
          key: column.id,
          value: linkMapping[initialValues[column.column]]?.hide,
        }),
      );
    }
  }, [column.column, column.id, dispatch, initialValues, linkMapping]);

  const onChange = (e: any) => {
    dispatch(
      updateHide({
        key: column.id,
        value: linkMapping[e].hide,
      }),
    );
  };

  return (
    <Form.Item label={column.name} name={column.column}>
      <AntSelect onChange={(e) => onChange(e)}>
        {dataSource.map((data: any) => {
          return (
            <Option key={data.value} value={`${data.value}`}>
              {data.label}
            </Option>
          );
        })}
      </AntSelect>
    </Form.Item>
  );
}

export default memo(Select);
