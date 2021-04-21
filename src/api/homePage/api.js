import {
  getRequest
} from '../index.js';

import { homePageUrl } from '@/config/url.js';

const url = `${homePageUrl}/block`;

// 首页发现
export const getDiscover = () => {
  return getRequest(`${url}/page`);
}