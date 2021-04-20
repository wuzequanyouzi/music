import { USER_NAME } from './type/user.js';

const userInfo = {
  userName: '柚子'
};

export const USER_INFO = (state = userInfo, action) => {
  switch (action.type) {
    case USER_NAME:
      return Object.assign({}, state, { userName: action.name });
    default:
      return state;
  }
}