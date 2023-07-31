import instance from './request';

export const userLogin = (params: any) => instance.post('login', params);

// 查询所有用户
export const getUsers = (params: any) => instance.post('user', params);

// 创建用户
export const createUser = (params: any) => instance.post('user/create', params);

// 更新用户
export const updateUser = (params: any) => instance.post('user/update', params);

export const getRoleForUser = (params: any) => instance.post('role/user', params);
