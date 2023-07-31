import instance from './request';

export const getRoles = (params: any) => instance.post('role', params);

export const createRole = (params: any) => instance.post('role/create', params);
