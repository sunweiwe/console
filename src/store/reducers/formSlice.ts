import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Form, ColumnType } from 'Src/form/types';
import { queryTableName, queryTableStruct, queryForm } from 'Src/service/form';

/**
 * 获取数据库所有的表名
 */
export const fetchTableName = createAsyncThunk(
  'form/queryTableName',
  queryTableName
);
/**
 * 获取某个数据库表的结构
 */
export const fetchTableStruct = createAsyncThunk(
  'form/queryTableStruct',
  (params: string) => queryTableStruct(params)
);

/**
 * 获取表单配置
 */
export const fetchFormConfig = createAsyncThunk(
  'form/queryFormConfig',
  async (id: string) => {
    const result = {
      data: {},
      tables: [],
      fields: [],
    };
    const { data } = await queryForm(id);
    result.data = data;
    if (data.dataSourceType === '1') {
      const res = await queryTableName();
      result.tables = res.data;
      const fields = await queryTableStruct(data.tablename);
      result.fields = fields.data;
    }

    return result;
  }
);

/**
 *
 */
export const fetchForm = createAsyncThunk(
  'form/queryForm',
  async (id: string) => queryForm(id)
);

export const formSlice = createSlice({
  name: 'form',
  initialState: {
    config: {
      columns: [] as ColumnType[],
      name: '',
      size: 'default',
      labelAlgin: '1',
      dataSourceType: '0',
      description: '',
    },
    currentColumn: '',
    hoverIndex: '',
    fields: [],
    tables: [],
    show: {},
    hide: {},
  } as Form,
  reducers: {
    addBlock: (state, action: any) => {
      state.config.columns.push(action.payload.block);
      state.currentColumn = action.payload.block.id;
    },
    removeBlock: (state, action) => {
      state.config.columns.splice(action.payload, 1);
      state.currentColumn = '';
    },
    reOrder(state, action) {
      const dragCard = state.config.columns[action.payload.from];
      state.config.columns[action.payload.from] =
        state.config.columns[action.payload.to];
      state.config.columns[action.payload.to] = dragCard;
    },
    updateBlock(state, action) {
      const pos = state.config.columns.findIndex(
        (i: any) => i.id === state.currentColumn
      );
      state.config.columns[pos] = {
        ...state.config.columns[pos],
        ...action.payload,
      };
    },
    updateConfig(state, action) {
      state.config = {
        ...state.config,
        ...action.payload,
      };
    },
    updateForm(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
    updateHoverIndex: (state, action: any) => {
      state.hoverIndex = action.payload.hoverIndex;
    },
    setCurrentColumn: (state, action) => {
      state.currentColumn = action.payload;
    },
    updateHide: (state, action) => {
      state.hide[action.payload.key] = action.payload.value;
      const set = [];

      for (const [key, value] of Object.entries(state.hide)) {
        if (key !== 'hide') {
          set.push(...value);
        }
      }

      state.hide.hide = set;
    },
  },
  extraReducers: {
    [fetchTableName.fulfilled.type]: (
      state: Form,
      action: PayloadAction<any>
    ) => {
      state.tables = action.payload.data;
    },
    [fetchTableStruct.fulfilled.type]: (
      state: Form,
      action: PayloadAction<any>
    ) => {
      state.fields = action.payload.data;
    },
    [fetchFormConfig.fulfilled.type]: (
      state: Form,
      action: PayloadAction<any>
    ) => {
      state.tables = action.payload.tables;
      state.fields = action.payload.fields;
      state.config = action.payload.data;
    },
    [fetchForm.fulfilled.type]: (state: Form, action: PayloadAction<any>) => {
      state.config = action.payload.data;
    },
  },
});

export const {
  reOrder,
  addBlock,
  updateHoverIndex,
  removeBlock,
  updateConfig,
  updateForm,
  setCurrentColumn,
  updateBlock,
  updateHide,
} = formSlice.actions;

export const getName = (state: any) => state.form.config.name;
export const getCurrentColumn = (state: any) => state.form.currentColumn;
export const selectColumns = (state: any) => state.form.config.columns;
export const currentHoverIndex = (state: any) => state.form.hoverIndex;

export default formSlice.reducer;
