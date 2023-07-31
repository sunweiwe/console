import instance from './request';

/**
 *
 * @param {*} params
 * @returns
 */
export const crateForm = (params: any) => instance.post('form/create', params);

/**
 *
 * @param params
 * @returns
 */
export const updateForm = (params: any) => instance.post(`form/update`, params);

/**
 *
 * @param {*} id
 * @returns
 */
export const queryForm = (id: string) => instance.get(`form?id=${id}`);

/**
 *
 * @param params
 * @returns
 */
export const queryFormListing = (params: any) => instance.post(`form`, params);

/**
 *
 * @param {*} id
 * @returns
 */
export const removeForm = (id: string) => instance.get(`form/remove?id=${id}`);

// ------------------------------------- 表单公共接口 ---------------------------------

/**
 *
 * @param param
 * @returns
 */
export const queryFormTable = (pagination: any, param: any) =>
  instance.post(`form/data?current=${pagination.current}&pageSize=${pagination.pageSize}`, param);

/**
 * 表单填报 提交数据
 * @param params
 * @returns
 */
export const formData = (id: string, params: any) =>
  instance.post(`form/data/create?id=${id}`, params);

/**
 *
 * @param id
 * @param dataKey
 * @returns
 */
export const formDataQueryById = (id: string, dataKey: string) =>
  instance.get(`form/data?id=${id}&dataKey=${dataKey}`);

/**
 *
 * @param id
 * @param dataKey
 * @param params
 * @returns
 */
export const formDataUpdateById = (id: string, dataKey: string, params: Record<string, any>) =>
  instance.post(`form/data/update?id=${id}&dataKey=${dataKey}`, params);

/**
 *
 * @param id
 * @param dataKey
 * @returns
 */
export const formDataRemove = (id: string, dataKey: string) =>
  instance.get(`form/data/remove?id=${id}&dataKey=${dataKey}`);

/**
 *
 * @returns
 */
export const queryTableName = () => instance.get('system/table');

/**
 *
 * @returns
 */
export const queryTableStruct = (params: string) =>
  instance.get(`system/table/struct?name=${params}`);
