import { request } from '../utils/request';

export const getPageListXHR = (params) =>
  request.get('/diary/page/get', { params: { ...params, openId: process.env.OPENID } });
