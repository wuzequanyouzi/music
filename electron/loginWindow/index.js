const { ipcMain, BrowserWindow } = require('electron');
const url = require('url');
const path = require('path');

const mode = process.argv[2];
ipcMain.on('login-before', (event, arg) => {
  console.log(event, arg);
  const win = new BrowserWindow({
    width: 350,
    height: 530,
    frame: false, // 无边框
    show: false,
    titleBarStyle: 'hidden',  // 隐藏标题栏, 内容充满整个窗口, 但它依然在左上角, 仍然受标准窗口控制.
    fullscreenable: false,  // 不可全屏
    resizable: false  // 不可更改尺寸
  })
  //  判断是否开发模式
  if (mode === 'dev') {
    win.loadURL('http://localhost:3000/login');
  } else {
    win.loadURL(url.format({
      pathname: path.join(__dirname, './build/login.html'),
      protocol: 'file',
      slashes: true
    }))
  }
  win.once('ready-to-show', () => {
    win.show();
  })
})