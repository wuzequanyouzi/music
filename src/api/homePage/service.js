import homepage from './api.js';

export class HomePageService {
  static getDiscover() {
    return homepage.getDiscover();
  }
}