import {
  getRequest,
  homePageUrl
} from '../index.js';

const url = `${homePageUrl}/block`;

// 首页发现
export const getDiscover = () => {
  return getRequest(`${url}/page`);
}