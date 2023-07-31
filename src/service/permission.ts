import instance from './request';

// 获取所有权限
export const getPermission = (params: { organization: string; role: string }) =>
  instance.post('permission', params);

// 设置权限
export const updatePermission = (params: {
  organization: string;
  role: string;
  path: string;
  method: string;
}) => instance.post('permission/update', params);
