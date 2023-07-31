import { createSlice } from '@reduxjs/toolkit';

export const workSpaceSlice = createSlice({
  name: 'workspace',
  initialState: {
    data: [],
  },
  reducers: {},
});

export const selectColumns = (state: any) => state.workspace.data;

export default workSpaceSlice.reducer;
