import {
  getRequest,
  personalizedUrl,
  programUrl
} from '../index.js';

// 新音乐推荐
const newSongUrl = `${personalizedUrl}/newsong`;

// 电台推荐
const djProgramUrl = `${personalizedUrl}/djprogram`;

// 节目推荐
const programRecommendUrl = `${programUrl}/recommend`;

// 歌单推荐
export const getPersonalized = (params) => {
  return getRequest(`${personalizedUrl}`, params);
}

// 新音乐推荐
export const getNewSong = (params) => {
  return getRequest(`${newSongUrl}`, params);
}

// 电台推荐
export const getDjProgram = () => {
  return getRequest(`${djProgramUrl}`);
}

// 电台推荐
export const getProgramRecommendUrl = () => {
  return getRequest(`${programRecommendUrl}`);
}