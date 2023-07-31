import instance from './request';

// 获取所有的接口
export const getInterfaces = (params: any) => instance.post('interfaces', params);

// 新增接口
export const createInterfaces = (params: any) => instance.post('interfaces/create', params);

// 编辑接口
export const updateInterfaces = (params: any) => instance.post('interfaces/update', params);

// 删除接口
export const removeInterfaces = (params: any) => instance.post('interfaces/remove', params);
