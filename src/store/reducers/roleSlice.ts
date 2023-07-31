import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getRoles } from 'Src/service/role';

export const fetchRoles = createAsyncThunk('role/getRoles', (params: any) => getRoles(params));

type Role = {
  data: {
    data: Record<string, any>[];
    total: number;
    current: number;
    pageSize: number;
  };
};

export const roleSlice = createSlice({
  name: 'role',
  initialState: {
    data: {
      data: [],
      total: 0,
      current: 1,
      pageSize: 10,
    },
  } as Role,
  reducers: {},
  extraReducers: {
    [fetchRoles.fulfilled.type]: (state: Role, action: PayloadAction<any>) => {
      state.data = action.payload.data;
    },
  },
});

export const Roles = (state: any) => state.role.data as Role['data'];

export default roleSlice.reducer;
