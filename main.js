const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');
const mode = process.argv[2];

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1024,
    height: 670,
    show: false,
    backgroundColor: '#ec4141',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true, // 是否启用节点集成
      webviewTag: true  // 是否启用<webview>标签
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