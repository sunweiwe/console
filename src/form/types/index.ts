// 定义一些类型和常量

type Size = 'default' | 'small' | 'large' | 'medium';

// 字段的数据类型 (也指代数据库字段类型)
type dataType = 'string' | 'number' | 'bool';

// 组件类型
type componentType =
  | 'input'
  | 'number'
  | 'textArea'
  | 'switch'
  | 'rate'
  | 'select'
  | 'childTable';

// 组件的属性
type ColumnType = {
  name: string;
  column: string;
  // 组件类型
  type: componentType;
  dataType: dataType;
  style: any;
  disabled: boolean;
  id: any;
  placeholder: string;

  // Switch
  defaultChecked?: boolean;
  loading?: boolean;
  checkedChildren?: string;
  unCheckedChildren?: string;

  // select
  dataSourceType?: string;
  dataSource?: string;
  linkMapping?: string;

  min?: number;
  max?: number;

  [key: string]: any;
};

type Form = {
  config: {
    columns: ColumnType[];

    name: string;
    description: string;
    size: Size;
    labelAlgin: string;
    dataSourceType: string;
    tablename: string;

    creatAt: string;
    updateAt: string;
    createBy: string;
    updateBy: string;
  };

  currentColumn: string;
  hoverIndex: string;
  fields: [];
  tables: [];

  hide: Record<string, string[]>;
  show: Record<string, string[]>;
};

export const componentTypeMenu: {
  type: componentType;
  name: string;
  id: string;
  dataType?: dataType;
}[] = [
  {
    type: 'input',
    name: '单行文本',
    id: '1',
    dataType: 'string',
  },
  {
    type: 'number',
    name: '数字',
    id: '2',
    dataType: 'number',
  },
  {
    type: 'textArea',
    name: '多行文本',
    dataType: 'string',
    id: '3',
  },
  {
    type: 'switch',
    name: '开关',
    dataType: 'bool',
    id: '4',
  },
  {
    type: 'rate',
    name: '评分',
    dataType: 'number',
    id: '5',
  },
  {
    type: 'select',
    name: '单选框',
    dataType: 'string',
    id: '6',
  },
  {
    type: 'childTable',
    name: '子表控件',
    id: '7',
  },
];

export const DNDTypes = {
  MENU: 'menu',
  BLOCK: 'block',
};

export type { Form, ColumnType, Size, dataType };
