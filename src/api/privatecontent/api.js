import {
  getRequest
} from '../index.js';
import { personalizedUrl } from '@/config/url.js';

const url = `${personalizedUrl}/privatecontent`;

// 独家放送（入口列表）
export const getPrivatecontent = () => {
  return getRequest(url);
}

export const getPrivatecontentList = (params) => {
  return getRequest(`${url}/list`, params);
}