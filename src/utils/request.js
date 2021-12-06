import axios from 'axios';

const BASE_URL = 'https://api.elegantyu.cn/diary';

export const request = axios.create({
  baseURL: BASE_URL,
  timeout: 60000,
});
