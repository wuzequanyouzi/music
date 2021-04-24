import { USER_NAME, LOGIN_INFO } from './type/user.js';

const userInfo = {
  userName: '柚子',
  loginInfo: {}
};

export const USER_INFO = (state = userInfo, action) => {
  switch (action.type) {
    case USER_NAME:
      return Object.assign({}, state, { userName: action.name });
    case LOGIN_INFO:
      return Object.assign({}, state, { loginInfo: action.loginInfo });
    default:
      return state;
  }
}