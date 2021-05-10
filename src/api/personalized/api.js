import {
  getRequest
} from '../index.js';
import { personalizedUrl } from '@/config/url.js';

const mvUrl = `${personalizedUrl}/mv`;

export const getPersonalizedMv = () => {
  return getRequest(mvUrl);
}