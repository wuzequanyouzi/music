import * as top from './api.js';

// 个性化
export class TopService {
  /**
   * @description 新歌速递
   * @param {Object} params : { type: Number } (全部-0，华语-7，欧美-96，日本-8，韩国-16)
   * @returns
   */
  static getNewMusics(params) {
    return top.getNewMusics(params);
  }
}