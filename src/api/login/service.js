import * as login from './api.js';
export class LoginService {
  static phoneLogin(params) {
    return login.phoneLogin(params);
  }
}