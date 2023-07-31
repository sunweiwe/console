import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Select, Spin } from 'antd';
import debounce from 'lodash/debounce';

const { Option } = Select;

function DebounceSelect({
  fetchOptions,
  debounceTimeout = 800,
  ...props
}: any) {
  const [fetching, setFetching] = useState(false);
  const [options, setOptions] = useState([]);
  const fetchRef = useRef(0);

  useEffect(() => {
    debounceFetcher('');
  }, []);

  const debounceFetcher = useMemo(() => {
    const loadOptions = (value = '') => {
      fetchRef.current += 1;
      const fetchId = fetchRef.current;
      setOptions([]);
      setFetching(true);
      fetchOptions(value).then((newOptions: any) => {
        if (fetchId !== fetchRef.current) {
          return;
        }

        setOptions(newOptions);
        setFetching(false);
      });
    };

    return debounce(loadOptions, debounceTimeout);
  }, [fetchOptions, debounceTimeout]);

  return (
    <Select
      filterOption={false}
      onSearch={debounceFetcher}
      showSearch
      notFoundContent={fetching ? <Spin size='small' /> : null}
      {...props}
      onSelect={(value: any) => {
        const [op] = options.filter((op: any) => op.id === value);
        props.form.setFieldsValue(op);
      }}
    >
      {options.map((option: any) => (
        <Option key={option.id} value={option.id}>
          {option.name}
        </Option>
      ))}
    </Select>
  );
}

export default DebounceSelect;
