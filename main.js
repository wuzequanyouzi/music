const { createLoginWindow, createLyricWindow } = require('./electron/index');
const { app, BrowserWindow, ipcMain, screen } = require('electron');
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
  let lyricWindow = null;

  /* --------------登录部分start-------------*/
  // 登录前
  ipcMain.on('login-before', (event, ...args) => {
    if (!loginWindow) {
      loginWindow = createLoginWindow(win);
    }
  });

  // 登陆后，拿到数据
  ipcMain.on('login-after', (event, userInfo) => {
    // 发给首页
    win.webContents.send('login-after-reply', userInfo);
  });

  ipcMain.on('login-window-close', (event, arg) => {
    loginWindow.close();
    loginWindow = null;
  });
  /* --------------登录部分end--------------*/

  /* --------------歌词部分start-------------*/

  // 主进程监听触发歌词信息保存的事件
  ipcMain.on('emit-save-lrc-info', (event, lrcInfo) => {
    lyricWindow && lyricWindow.webContents.send('save-lrc-info', lrcInfo);
  });

  // 主进程监听触发歌词更新的事件
  ipcMain.on('emit-update-lrc-words', (event, time) => {
    lyricWindow && lyricWindow.webContents.send('update-lrc-words', time);
  });

  let lyricWindowMovingInterval = null;
  // 歌词打开
  ipcMain.on('lyric-open', (event, ...args) => {
    if (!lyricWindow) {
      lyricWindow = createLyricWindow();
    } else {
      lyricWindow.show();
    }
  });
  // 歌词关闭
  ipcMain.on('lyric-hide', (event, ...args) => {
    lyricWindow.hide();
  });
  ipcMain.on('drag', (event, status) => {
    if (status) {
      const lyricWindowPosition = lyricWindow.getPosition();
      const mouseStartPosition = screen.getCursorScreenPoint();
      lyricWindowMovingInterval && clearInterval(lyricWindowMovingInterval);
      lyricWindowMovingInterval = setInterval(() => {
        // 实时更新位置
        const cursorPosition = screen.getCursorScreenPoint();
        const x = lyricWindowPosition[0] + cursorPosition.x - mouseStartPosition.x;
        const y = lyricWindowPosition[1] + cursorPosition.y - mouseStartPosition.y;
        lyricWindow.setPosition(x, y, true);
      }, 10);
    } else {
      clearInterval(lyricWindowMovingInterval);
      lyricWindowMovingInterval = null;
    }
  });
  /* --------------歌词部分end---------------*/

  // 是否全屏
  ipcMain.on('set-full-screen', (event, fullscreenable) => {
    win.setFullScreen(fullscreenable);
  });

  // 最小化
  ipcMain.on('set-minimize', (event) => {
    win.minimize();
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