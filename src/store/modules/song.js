/**
 * @description: 歌曲信息全局共享
 */
import {
  CURRENT_PLAYING_SONG,
  SONG_PLAY_LIST
} from '../type/song.js';


const songInfo = {
  currentPlayingSong: {},
  songPlayList: []
};

export const SONG_INFO = (state = songInfo, action) => {
  switch (action.type) {
    case CURRENT_PLAYING_SONG:
      return Object.assign({}, state, { currentPlayingSong: action.currentPlayingSong });
    case SONG_PLAY_LIST:
      return Object.assign({}, state, { songPlayList: action.songPlayList });
    default:
      return state;
  }
};