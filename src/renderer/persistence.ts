import { ipcRenderer, IpcRendererEvent } from 'electron'
import { v4 as uuid } from 'uuid'

import { ISettingsState } from './store/settings/types'
import { editSettings } from './store/settings/actions'

import { IThemeState } from './store/gui/types'
import { setMode, setSize } from './store/gui/actions'

import { addServer } from './store/connections/actions'

import store, { RootState } from './store'

import {
  SAVE_FILE,
  SAVE_FILE_RESULT,
  READ_FILE,
  READ_FILE_RESULT,
} from '../common/ipc'

function saveFile<T>(filename: string, data: T) {
  return new Promise((resolve, reject) => {
    const saveGuid = uuid()
    ipcRenderer.send(SAVE_FILE, filename, data, saveGuid)
    ipcRenderer.once(
      `${SAVE_FILE_RESULT}:${saveGuid}`,
      (event: IpcRendererEvent, response: { err: any }) => {
        if (response.err) {
          reject(response.err)
        } else {
          resolve()
        }
      }
    )
  })
}

function readFile<T>(filename: string): Promise<T> {
  return new Promise((resolve, reject) => {
    const readGuid = uuid()
    ipcRenderer.send(READ_FILE, filename, readGuid)
    ipcRenderer.once(
      `${READ_FILE_RESULT}:${readGuid}`,
      (event: IpcRendererEvent, response: { err: any; data: T }) => {
        if (response.err) {
          reject(response.err)
        } else {
          resolve(response.data)
        }
      }
    )
  })
}

const SETTINGS_FILENAME = 'settings.ato'

interface IPersistedSettings {
  settings: ISettingsState
  theme: IThemeState
}

const getPersistedSettings = (state: RootState): IPersistedSettings => {
  return {
    settings: state.settings,
    theme: state.gui,
  }
}

const hydrateSettings = (state: IPersistedSettings) => {
  // First, the settings proper
  store.dispatch(editSettings(state.settings))

  // Now we update the GUI variables
  store.dispatch(setMode(state.theme.mode))
  store.dispatch(setSize(state.theme.size))
}

const CONNECTIONS_FILENAME = 'connections.ato'

interface IPersistedChannel {
  name: string
}

interface IPersistedServer {
  name: string
  url: string
  nickname: string
  channels: IPersistedChannel[]
}

interface IPersistedConnections {
  servers: IPersistedServer[]
}

const getPersistedConnections = (state: RootState): IPersistedConnections => {
  return {
    servers: state.connections.servers.map(s => ({
      name: s.name,
      url: s.url,
      nickname: s.nickname,
      channels: s.channels
        .filter(c => c.name !== '#') // we don't want the server channel to be stored!
        .map(c => ({
          name: c.name,
        })),
    })),
  }
}

const hydrateConnections = (state: IPersistedConnections) => {
  state.servers.forEach(s => {
    store.dispatch(
      addServer(
        s.name,
        s.url,
        s.nickname,
        s.channels.map(c => c.name)
      )
    )
  })
}

export const setup = async () => {
  // hydrate settings from file
  try {
    const settings: IPersistedSettings = await readFile(SETTINGS_FILENAME)
    hydrateSettings(settings)
  } catch (e) {
    // No settings to load...
  }

  // hydrate connections from file
  try {
    const connections: IPersistedConnections = await readFile(
      CONNECTIONS_FILENAME
    )
    hydrateConnections(connections)
  } catch (e) {
    // No connections to load...
  }

  let oldPersistedSettings: IPersistedSettings | undefined = undefined
  let oldPersistedConnections: IPersistedConnections | undefined = undefined
  store.subscribe(() => {
    const state = store.getState()
    const persistedSettings = getPersistedSettings(state)
    if (oldPersistedSettings !== persistedSettings) {
      oldPersistedSettings = persistedSettings
      saveFile(SETTINGS_FILENAME, persistedSettings)
    }

    const persistedConnections = getPersistedConnections(state)
    if (oldPersistedConnections !== persistedConnections) {
      oldPersistedConnections = persistedConnections
      saveFile(CONNECTIONS_FILENAME, persistedConnections)
    }
  })
}
