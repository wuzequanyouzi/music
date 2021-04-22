import axios from 'axios';
import { successReponseInterceptor, errResponseInterceptor, successRequestInterceptor } from './interceptors';

const myaxios = axios.create();
myaxios.defaults.timeout = 5 * 60 * 1000;

/* 请求拦截 */
myaxios.interceptors.request.use(
  successRequestInterceptor,
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

/* 响应拦截 */
myaxios.interceptors.response.use(successReponseInterceptor, errResponseInterceptor);

export const getRequest = (url, params) => {
  return myaxios({
    method: 'get',
    url: `${url}`,
    params
  });
};

export const postRequest = (url, params) => {
  return myaxios({
    method: 'post',
    url: `${url}`,
    params,
    headers: {
      'Content-Type': 'application/json;'
    }
  });
};


// 首页
export { HomePageService } from './homePage/service';

// 独家
export { PrivatecontentService } from './privatecontent/service';

// 推荐
export { RecommendService } from './recommend/service';

// 登录
export { LoginService } from './login/service';