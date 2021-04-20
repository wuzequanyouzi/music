import recommend from './api.js';

export class RecommendService {
  /**
   * @static
   * @param {Number} limit: 取出数量 , 默认为 30 (不支持 offset)
   * @returns
   * @memberof RecommendService
   */
  static getPersonalized(limit) {
    return recommend.getPersonalized({ limit });
  }

  /**
   * @static
   * @param {Number} limit: 取出数量 , 默认为 10 (不支持 offset)
   * @returns
   * @memberof RecommendService
   */
  static getNewSong(limit) {
    return recommend.getNewSong({ limit });
  }

  static getDjProgram(limit, offset) {
    return recommend.getDjProgram({ limit, offset });
  }

  static getProgramRecommendUrl(limit, offset) {
    return recommend.getProgramRecommendUrl({ limit, offset });
  }
}




