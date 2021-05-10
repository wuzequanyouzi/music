import * as personalized from './api.js';

// 个性化
export class PersonalizedService {
  /**
   * @description 推荐MV
   * @returns
   */
  static getPersonalizedMv() {
    return personalized.getPersonalizedMv();
  }
}