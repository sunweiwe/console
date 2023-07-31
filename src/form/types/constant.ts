// 定义一些类型和常量

// form 对齐方式常量
export const LabelTypes = [
  {
    label: "左对齐",
    value: "1",
  },
  {
    label: "右对齐",
    value: "2",
  },
  {
    label: "顶部对齐",
    value: "3",
  },
];

export const SizeTypes = [
  {
    label: "较小",
    value: "small",
  },
  {
    label: "中等",
    value: "default",
  },
  {
    label: "默认",
    value: "large",
  },
];

export const DataSourceType = [
  {
    label: "默认生成",
    value: "0",
  },
  {
    label: "数据库表",
    value: "1",
  },
];

type Props = {
  title?: string;
  field: string;
  type: string;
  data?: any[];
};

export const opBaseProps: Props[] = [
  { field: "name", type: "input", title: "列名" },
  { field: "column", type: "select", title: "字段" },
  { field: "disabled", type: "switch", title: "禁用" },
];

export const opProps: { [key: string]: Props[] } = {
  input: [
    { field: "placeholder", type: "input", title: "占位提示" },
    { field: "maxLength", type: "number", title: "最大长度" },
    { field: "prefix", type: "input", title: "前缀" },
    { field: "suffix", type: "input", title: "后缀" },
  ],
  number: [
    { field: "placeholder", type: "input", title: "占位提示" },
    { field: "controls", type: "switch", title: "显示增减按钮" },
    { field: "max", type: "number", title: "最大值" },
    { field: "min", type: "number", title: "最小值" },
    { field: "step", type: "number", title: "步长" },
    { field: "decimalSeparator", type: "input", title: "小数点样式" },
  ],
  textArea: [
    { field: "placeholder", type: "input", title: "占位提示" },
    { field: "maxLength", type: "number", title: "最大长度" },
    { field: "showCount", type: "switch", title: "是否展示字数" },
    { field: "rows", type: "number", title: "内容高度" },
  ],
  switch: [
    { field: "checkedChildren", type: "input", title: "选中时的文字" },
    { field: "unCheckedChildren", type: "input", title: "非选中时的文字" },
  ],
  rate: [
    { field: "allowHalf", type: "switch", title: "半选" },
    { field: "allowClear", type: "switch", title: "再次点击后清除" },
    { field: "count", type: "number", title: "总数" },
    { field: "tooltips", type: "input", title: "自定义每项的提示信息(逗号分隔)" },
    { field: "character", type: "input", title: "自定义字符" },
  ],
  select: [
    {
      field: "dataSourceType",
      type: "select",
      title: "数据选项",
      data: [
        {
          value: "1",
          label: "静态数据",
        },
        {
          value: "2",
          label: "字典数据",
        },
        {
          value: "3",
          label: "资产数据",
        },
      ],
    },
  ],
};
