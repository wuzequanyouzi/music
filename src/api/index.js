import axios from 'axios';
import { successReponseInterceptor, errResponseInterceptor, successRequestInterceptor } from './interceptors';

const myaxios = axios.create();
myaxios.defaults.timeout = 5 * 60 * 1000;

/* 请求拦截 */
myaxios.interceptors.request.use(
  successRequestInterceptor,
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

/* 响应拦截 */
myaxios.interceptors.response.use(successReponseInterceptor, errResponseInterceptor);

// 服务入口
export const baseUrl = 'https://music-cloud-node-api.vercel.app';

// 首页推荐
export const homePageUrl = `${baseUrl}/homepage`;

// 个性化服务
export const personalizedUrl = `${baseUrl}/personalized`;

// program
export const programUrl = `${baseUrl}/program`;

export const getRequest = (url, params) => {
  return myaxios({
    method: 'get',
    url: `${url}`,
    params
  });
};

// 首页
export { HomePageService } from './homePage/service';

// 独家
export { PrivatecontentService } from './privatecontent/service';

// 推荐
export { RecommendService } from './recommend/service';