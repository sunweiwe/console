import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getInterfaces } from 'Src/service/interfaces';

export const fetchInterfaces = createAsyncThunk(
  'interfaces/getInterfaces',
  (params: any) => getInterfaces(params)
);

type Interfaces = {
  data: {
    data: Record<string, any>[];
    total: number;
    current: number;
    pageSize: number;
  };
};

export const interfaceSlice = createSlice({
  name: 'interfaces',
  initialState: {
    data: {
      data: [],
      total: 0,
      current: 1,
      pageSize: 10,
    },
  } as Interfaces,
  reducers: {},
  extraReducers: {
    [fetchInterfaces.fulfilled.type]: (state: Interfaces, action: PayloadAction<any>) => {
      state.data = action.payload.data;
    },
  },
});

export const Interfaces = (state: any) => state.interfaces.data as Interfaces['data'];

export default interfaceSlice.reducer;
