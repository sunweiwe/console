import { ColumnType } from "Src/form/types";

export type Props = {
  type?: string;
  title: string;
  column: string;
  changeColumnParams: () => void;
  value: any;
  data?: any[];
  config?: ColumnType;
};
