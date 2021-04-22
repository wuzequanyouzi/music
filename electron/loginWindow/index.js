const { ipcMain, BrowserWindow } = require('electron');
const url = require('url');
const path = require('path');

const mode = process.argv[2];

const createLoginWindow = (homeWindow) => {
  const loginWindow = new BrowserWindow({
    parent: homeWindow,
    width: 350,
    height: 530,
    frame: false, // 无边框
    show: false,
    titleBarStyle: 'hidden',  // 隐藏标题栏, 内容充满整个窗口, 但它依然在左上角, 仍然受标准窗口控制.
    fullscreenable: false,  // 不可全屏
    resizable: false,  // 不可更改尺寸
    autoHideMenuBar: true,  //  隐藏菜单栏
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
    loginWindow.loadURL('http://localhost:3000/login.html');
  } else {
    loginWindow.loadURL(url.format({
      pathname: path.join(__dirname, './build/login.html'),
      protocol: 'file',
      slashes: true
    }))
  }
  loginWindow.once('ready-to-show', () => {
    loginWindow.show();
  });

  return loginWindow;
}

module.exports = createLoginWindow;