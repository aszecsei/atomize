import { app, BrowserWindow } from 'electron'
import installExtension, {
  REACT_DEVELOPER_TOOLS,
  REDUX_DEVTOOLS,
} from 'electron-devtools-installer'
import * as path from 'path'
import { format as formatUrl } from 'url'
import { autoUpdater } from 'electron-updater'
import * as log from 'electron-log'

/*
const appName = 'Atomize'
app.name = appName
const appData = app.getPath('appData')
app.setPath('userData', path.join(appData, appName))
*/

const isDevelopment = process.env.NODE_ENV !== 'production'

let mainWindow: BrowserWindow | null

export function createMainWindow() {
  const window = new BrowserWindow({
    frame: true,
    height: 720,
    width: 1280,
    webPreferences: {
      nodeIntegration: true,
    },
  })

  if (isDevelopment) {
    window.webContents.on('did-frame-finish-load', () => {
      window.webContents.openDevTools()
    })
  }

  if (isDevelopment) {
    window.loadURL(`http://localhost:${process.env.ELECTRON_WEBPACK_WDS_PORT}`)
  } else {
    window.loadURL(
      formatUrl({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file',
        slashes: true,
      })
    )
  }

  window.on('closed', () => {
    mainWindow = null
  })

  window.webContents.on('devtools-opened', () => {
    window.focus()
    setImmediate(() => {
      window.focus()
    })
  })

  installExtension(REACT_DEVELOPER_TOOLS)
    .then(name => {
      console.log(`Added extension: ${name}`)
    })
    .catch(err => {
      console.error(`An error occurred: ${err}`)
    })

  installExtension(REDUX_DEVTOOLS)
    .then(name => {
      console.log(`Added extension: ${name}`)
    })
    .catch(err => {
      console.error(`An error occurred: ${err}`)
    })

  return window
}

app.on('window-all-closed', () => {
  // On macOS, don't quit until the user explicitly quits
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS, re-create a window even after all windows have been closed
  if (mainWindow === null) {
    mainWindow = createMainWindow()
  }
})

app.on('ready', () => {
  log.transports.file.level = 'debug'
  autoUpdater.logger = log
  autoUpdater.checkForUpdatesAndNotify()
  mainWindow = createMainWindow()
})
