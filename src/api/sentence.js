import { request } from '../utils/request';

export const getPageListXHR = (params) =>
  request.get('/page/get', { params: { ...params, openId: 'onwa45d5fwf9F7bcfRn7KNfrwamo' } });
