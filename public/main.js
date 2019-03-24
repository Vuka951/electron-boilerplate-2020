const {app, BrowserWindow} = require('electron');
const path = require('path');
const url = require('url');
const isDev = require('electron-is-dev');

let mainWindow;

const installExtensions = () => {
  const {default: installExtension, REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS} = require('electron-devtools-installer');

  installExtension(REACT_DEVELOPER_TOOLS)
    .then((name) => console.log(`Added Extension:  ${name}`))
    .catch((err) => console.log('An error occurred: ', err));
  installExtension(REDUX_DEVTOOLS)
    .then((name) => console.log(`Added Extension:  ${name}`))
    .catch((err) => console.log('An error occurred: ', err));
};

function createWindow() {
  if (isDev) {
    installExtensions();
  }
  mainWindow = new BrowserWindow({width: 900, height: 680});
  mainWindow.loadURL(isDev ? 'http://localhost:8080' : url.format({
    pathname: path.join(__dirname, '../web-build/index.html'),
    protocol: 'file',
    slashes: true,
  }));
  // Express server set up
  // eslint-disable-next-line no-unused-vars
  let server;
  isDev ? server = null : server = require(path.join(__dirname, '../server-build/bundle-back.js'));

  mainWindow.on('closed', () => mainWindow = null);
  if (isDev) {
    mainWindow.webContents.openDevTools();
  }
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
