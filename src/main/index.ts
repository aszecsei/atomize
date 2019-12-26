import { app, BrowserWindow, ipcMain, IpcMainEvent } from 'electron'
import installExtension, {
  REACT_DEVELOPER_TOOLS,
  REDUX_DEVTOOLS,
} from 'electron-devtools-installer'
import * as path from 'path'
import { format as formatUrl } from 'url'
import { autoUpdater } from 'electron-updater'
import * as log from 'electron-log'
import * as fs from 'fs'
import * as os from 'os'
import cfg from 'electron-cfg'

import {
  SAVE_FILE,
  SAVE_FILE_RESULT,
  READ_FILE,
  READ_FILE_RESULT,
  SHOULD_CLOSE,
} from '../common/ipc'

/*
const appName = 'Atomize'
app.name = appName
const appData = app.getPath('appData')
app.setPath('userData', path.join(appData, appName))
*/

const isDevelopment = process.env.NODE_ENV !== 'production'

let mainWindow: BrowserWindow | null

export function createMainWindow() {
  const window = cfg.window().create({
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

ipcMain.addListener(SHOULD_CLOSE, () => {
  if (mainWindow) {
    mainWindow.close()
  }
})

function getAppFolder() {
  const home = os.homedir()
  return path.join(home, '.atomize')
}

function getFilePath(filename: string) {
  return path.join(getAppFolder(), filename)
}

ipcMain.on(
  SAVE_FILE,
  (event: IpcMainEvent, filename: string, data: any, guid: string) => {
    const filePath = getFilePath(filename)
    if (!fs.existsSync(getAppFolder())) {
      fs.mkdirSync(getAppFolder())
    }
    fs.writeFile(filePath, JSON.stringify(data), 'utf8', err => {
      event.reply(`${SAVE_FILE_RESULT}:${guid}`, {
        err,
      })
    })
  }
)

ipcMain.on(READ_FILE, (event: IpcMainEvent, filename: string, guid: string) => {
  const filePath = getFilePath(filename)
  fs.readFile(filePath, 'utf8', (err, data) => {
    event.reply(`${READ_FILE_RESULT}:${guid}`, {
      err,
      data: err ? null : JSON.parse(data),
    })
  })
})
