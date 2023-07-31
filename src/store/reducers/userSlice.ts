import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getUsers } from 'Src/service/system';

export const fetchUsers = createAsyncThunk('user/getUsers', (params: any) =>
  getUsers(params)
);

type User = {
  currentUser: Record<string, any>;
  users: {
    data: Record<string, any>[];
    total: number;
    current: number;
    pageSize: number;
  };
};

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    currentUser: {} as any,
    users: {
      data: [],
      total: 0,
      current: 1,
      pageSize: 10,
    },
  } as User,
  reducers: {},
  extraReducers: {
    [fetchUsers.fulfilled.type]: (state: User, action: PayloadAction<any>) => {
      state.users = action.payload.data;
    },
  },
});

export const Users = (state: any) => state.user.users as User['users'];

export default userSlice.reducer;
