import {
  getRequest,
  homePageUrl
} from '@/api/index.js';

console.log(homePageUrl);

const url = `${homePageUrl}/block`;

// 首页发现
export const getDiscover = () => {
  return getRequest(`${url}/page`);
}