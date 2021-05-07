import * as song from './api.js';
export class SongService {
  static getSongSheetDetail(params) {
    return song.getSongSheetDetail(params);
  }
  static getSongDetail(params) {
    return song.getSongDetail(params);
  }
  static getSongMp3Url(params) {
    return song.getSongMp3Url(params);
  }
}