import { configureStore } from '@reduxjs/toolkit';
import formReducer from './reducers/formSlice';
import workSpaceSlice from './reducers/workSpaceSlice';
import userSlice from './reducers/userSlice';
import roleSlice from './reducers/roleSlice';
import interfaceSlice from './reducers/interfaceSlice';
import permissionSlice from './reducers/permission';

export default configureStore({
  reducer: {
    form: formReducer,
    workspace: workSpaceSlice,
    user: userSlice,
    role: roleSlice,
    interfaces: interfaceSlice,
    permission: permissionSlice,
  },
  devTools: true,
});
