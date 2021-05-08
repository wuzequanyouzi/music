const { ipcMain, BrowserWindow } = require('electron');
const url = require('url');
const path = require('path');

const mode = process.argv[2];

const createLyricWindow = (homeWindow) => {
  const lyricWindow = new BrowserWindow({
    parent: homeWindow,
    width: 550,
    height: 80,
    minHeight: 80,
    maxHeight: 180,
    frame: false, // 无边框
    show: false,
    titleBarStyle: 'hidden',  // 隐藏标题栏, 内容充满整个窗口, 但它依然在左上角, 仍然受标准窗口控制.
    fullscreenable: false,  // 不可全屏
    autoHideMenuBar: true,  //  隐藏菜单栏
    backgroundColor: '#00FFFFFF',
    transparent: true,      // 透明
    webPreferences: {
      javascript: true,
      plugins: true,
      nodeIntegration: true, // 是否启用Node集成
      webSecurity: false,
      // webviewTag: true  // 是否启用<webview>标签
      enableRemoteModule: true,
      contextIsolation: false
    }
  })
  //  判断是否开发模式
  if (mode === 'dev') {
    lyricWindow.loadURL('http://localhost:3000/index.html/#/lyric');
  } else {
    lyricWindow.loadURL(url.format({
      pathname: path.join(__dirname, './build/index.html/#/lyric'),
      protocol: 'file',
      slashes: true
    }))
  }
  lyricWindow.once('ready-to-show', () => {
    lyricWindow.show();
  });

  return lyricWindow;
}

module.exports = createLyricWindow;