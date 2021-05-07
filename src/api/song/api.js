import {
  getRequest
} from '../index.js';

import { songSheetUrl, songUrl, baseUrl } from '@/config/url.js';

// 歌单详情
const url = `${songSheetUrl}/detail`;

// 歌曲详情
const songDetailUrl = `${songUrl}/detail`;

// 音乐链接
const songMp3Url = `${songUrl}/url`;

// 歌词
const songLyricUrl = `${baseUrl}/lyric`;

// 获取歌单详情
export const getSongSheetDetail = (params) => {
  return getRequest(`${url}`, params);
}

// 获取歌曲详情
export const getSongDetail = (params) => {
  return getRequest(`${songDetailUrl}`, params);
}

// 获取音乐链接
export const getSongMp3Url = (params) => {
  return getRequest(`${songMp3Url}`, params);
}

// 获取歌词
export const getSongLyric = (params) => {
  return getRequest(`${songLyricUrl}`, params);
}