import {
  postRequest
} from '../index.js';

import { loginUrl } from '@/config/url.js';

const phoneUrl = `${loginUrl}/cellphone`;

// 手机登录
export const phoneLogin = (params) => {
  return postRequest(phoneUrl, params);
}