const { ipcMain, BrowserWindow } = require('electron');
const url = require('url');
const path = require('path');

const mode = process.argv[2];

const createLyricWindow = (homeWindow) => {
  const lyricWindow = new BrowserWindow({
    parent: homeWindow || null,
    width: 550,
    minWidth: 550,
    height: 80,
    minHeight: 80,
    maxHeight: 180,
    frame: false, // 无边框
    show: false,
    skipTaskbar: true, // 是否在任务栏显示窗口
    alwaysOnTop: true, // 窗口永远在其他窗口之上
    hasShadow: true, // 窗口是否应有阴影
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
    lyricWindow.loadURL('http://localhost:3000/lyric.html');
  } else {
    lyricWindow.loadURL(url.format({
      pathname: path.join(__dirname, '../../build/lyric.html'),
      protocol: 'file',
      slashes: true
    }))
  }
  lyricWindow.once('ready-to-show', () => {
    lyricWindow.show();
    lyricWindow.shadow = true;
  });

  return lyricWindow;
}

module.exports = createLyricWindow;