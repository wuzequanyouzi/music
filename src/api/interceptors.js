import axios from 'axios';
export const SUCCESS_CODE = 200;
export const ERROR_CODE_MESSAGE = {
  500: '服务器错误，请联系网络管理员寻求帮助',
  404: '未找到资源',
  400: '请求错误',
  401: '认证失效，请重新登录'
};

const CancelToken = axios.CancelToken;
// 存放执行的请求
let pendings = [];
// 请求中断方法
const removePendingRequest = (reqId) => {
  const newPenddings = [];
  pendings.forEach((p, index) => {
    // 根据请求标识将请求取消
    if (p.reqId === reqId) {
      p.cancel('cancel');
    } else {
      newPenddings.push(p);
    }
  });
  pendings = newPenddings;
};

/**
 * @description: 响应成功拦截器
 * @param {Object}  axiosResponse
 * @return {data || error}
 * @author: youzi
 */
export const successReponseInterceptor = axiosResponse => {
  const { data: { code, result, data } } = axiosResponse;
  const resultData = result || data || axiosResponse.data;
  if (code === SUCCESS_CODE) {
    return resultData;
  }

  throw new Error('异常');
};

/**
 * @description: 响应错误拦截器
 * @param {Object} errResponse
 * @return {error}
 * @author: youzi
 */
export const errResponseInterceptor = errResponse => {
  /* 请求为主动中断 */
  if (errResponse.message === 'cancel') {
    return new Error('cancel');
  }

  // 将 错误信息 更改成对应的提示信息，并且 401 返回登录
  if (errResponse.message === 'Network Error') {
    errResponse.message = '网络错误';
    return Promise.reject(errResponse);
  }

  const { status, data: { code } } = errResponse.response;

  if (ERROR_CODE_MESSAGE[status]) {
    errResponse.message = ERROR_CODE_MESSAGE[status];
  }
  return Promise.reject(errResponse);
};

/**
 * @description: 请求成功拦截器
 * @param {type} 请求对象
 * @return {type} 请求对象
 * @author: 柚子
 */
export const successRequestInterceptor = config => {
  /* 获取登录成功时存储的token */
  // const token = sessionStorage.getItem('token');
  // if (token) {
  // }

  // 获取从请求调用时（api层)传过来的参数
  if (config.rest) {
    const { rest } = config;
    // 传递了removeId表示要将指定的请求取消
    if (rest.removeId) {
      removePendingRequest(rest.removeId);
    }
    if (rest.id) {
      // 存储请求标识
      config.cancelToken = new CancelToken((c) => {
        pendings.push({ reqId: rest.id, cancel: c });
      });
    }
  }

  return config;
};
