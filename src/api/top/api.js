import {
  getRequest
} from '../index.js';
import { topUrl } from '@/config/url.js';

// 新歌速递
const newMusics = `${topUrl}/song`;

export const getNewMusics = (params) => {
  return getRequest(newMusics, params);
}