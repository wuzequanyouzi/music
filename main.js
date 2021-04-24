const { createLoginWindow } = require('./electron/index');
const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const url = require('url');
const mode = process.argv[2];

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1024,
    minWidth: 1024,
    height: 670,
    minHeight: 670,
    frame: false, // 无边框
    show: false,
    backgroundColor: '#ec4141',
    autoHideMenuBar: true,  //  隐藏菜单栏
    webPreferences: {
      javascript: true,
      plugins: true,
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true, // 是否启用Node集成
      webSecurity: false,
      // webviewTag: true  // 是否启用<webview>标签
      enableRemoteModule: true,
      contextIsolation: false
    }
  });

  //  判断是否开发模式
  if (mode === 'dev') {
    win.loadURL('http://localhost:3000/');
  } else {
    win.loadURL(url.format({
      pathname: path.join(__dirname, './build/index.html'),
      protocol: 'file',
      slashes: true
    }))
  }

  let loginWindow = null;

  // 登录前
  ipcMain.on('login-before', (event, ...args) => {
    if (!loginWindow) {
      loginWindow = createLoginWindow(win);
    }
  });

  // 登陆后，拿到数据
  ipcMain.on('login-after', (event, userInfo) => {
    console.log(userInfo.loginType);
    // 发给首页
    win.webContents.send('login-after-reply', userInfo);
  });

  ipcMain.on('login-window-close', (event, arg) => {
    loginWindow.close();
    loginWindow = null;
    console.log('123');
  });

  win.webContents.on("did-finish-load", () => {
  })
  win.webContents.on('dom-ready', () => {
  })
  win.once('ready-to-show', () => {
    win.show();
  })
}

app.on('ready', () => {
  createWindow();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
})