import { InputProps } from "antd";

import { ColumnType } from "../../types";

export function TableRender({ text, column }: { column: ColumnType & InputProps; text: any; record: any }) {
  if (column.dataSourceType === "1") {
    const datasource = JSON.parse(column.dataSource || "[]") as any[];
    const target = datasource.find((data) => `${data.value}` === `${text}`);
    return target?.label || "";
  }

  return text;
}

export default TableRender;
