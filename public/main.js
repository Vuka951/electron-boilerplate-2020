const {app, BrowserWindow} = require('electron');
const path = require('path');
const url = require('url');
const isDev = require('electron-is-dev');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({width: 900, height: 680});
  mainWindow.loadURL(isDev ? 'http://localhost:8080' : url.format({
    pathname: path.join(__dirname, '../web-build/index.html'),
    protocol: 'file',
    slashes: true,
  }));
  // Express server set up
  let server = require('./server.js');

  mainWindow.on('closed', () => mainWindow = null);
  mainWindow.webContents.openDevTools();
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
