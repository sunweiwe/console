import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getPermission } from 'Src/service/permission';

export const fetchPermission = createAsyncThunk(
  'permission/fetchPermission',
  (params: { organization: string; role: string }) => getPermission(params)
);

type State = {
  data: [];
};

export const permissionSlice = createSlice({
  name: 'permission',
  initialState: {
    data: [],
  } as State,
  reducers: {},
  extraReducers: {
    [fetchPermission.fulfilled.type]: (state: State, action: PayloadAction<any>) => {
      state.data = action.payload.data;
    },
  },
});

export default permissionSlice.reducer;
