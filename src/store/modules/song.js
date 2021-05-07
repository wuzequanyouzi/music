/**
 * @description: 歌曲信息全局共享
 */
import {
  CURRENT_PLAYING_SONG,
  SONG_PLAY_LIST,
  SONG_LYRIC_INFO
} from '../type/song.js';

import { getLrcArray } from '@/utils';

// State
const songInfo = {
  currentPlayingSong: {},
  songPlayList: [],
  songLyricInfo: {}
};


export const SONG_INFO = (state = songInfo, action) => {
  switch (action.type) {
    case CURRENT_PLAYING_SONG:
      return Object.assign({}, state, { currentPlayingSong: action.currentPlayingSong });
    case SONG_PLAY_LIST:
      return Object.assign({}, state, { songPlayList: action.songPlayList });
    case SONG_LYRIC_INFO:
      return Object.assign({}, state, {
        songLyricInfo: {
          ...action.songLyricInfo,
          lrcArray: getLrcArray(action.songLyricInfo.lrc.lyric)
        }
      });
    default:
      return state;
  }
};