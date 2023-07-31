import { InputProps } from "antd";

import { ColumnType } from "../../types";

export function TableRender({ text }: { column: ColumnType & InputProps; text: any; record: any }) {
  return text;
}

export default TableRender;
