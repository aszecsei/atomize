import connections, * as fromConnections from './connections/reducers'
import gui, * as fromGui from './gui/reducers'
import settings, * as fromSettings from './settings/reducers'
import system, * as fromSystem from './system/reducers'

import { combineReducers, createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { connectionsSaga } from './connections/sagas'
import createSagaMiddleware from 'redux-saga'
import { spawn } from 'redux-saga/effects'

export const rootReducer = combineReducers({
  connections,
  gui,
  settings,
  system,
})

export type RootState = ReturnType<typeof rootReducer>

const epicMiddleware = createSagaMiddleware()
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(epicMiddleware))
)

function* rootSaga() {
  yield spawn(connectionsSaga)
}
epicMiddleware.run(rootSaga)

export default store

// ==================================== SELECTORS ====================================

// SETTINGS
export const getSettings = (state: RootState) => state.settings

// SYSTEM
export const getAddServerModalOpen = (state: RootState) =>
  fromSystem.getAddServerModalOpen(state.system)
export const getAddChannelModalOpen = (state: RootState) =>
  fromSystem.getAddChannelModalOpen(state.system)
export const getEditSettingsModalOpen = (state: RootState) =>
  fromSystem.getEditSettingsModalOpen(state.system)

// GUI
export const getThemeMode = (state: RootState) =>
  fromGui.getThemeMode(state.gui)
export const getThemeSize = (state: RootState) =>
  fromGui.getThemeSize(state.gui)

// CONNECTIONS
export const getSelectedServerId = (state: RootState) =>
  fromConnections.getSelectedServerId(state.connections)
export const getSelectedChannelId = (state: RootState) =>
  fromConnections.getSelectedChannelId(state.connections)
export const getServers = (state: RootState) =>
  fromConnections.getServers(state.connections)
export const getSelectedServer = (state: RootState) =>
  fromConnections.getSelectedServer(state.connections)
export const getSelectedChannel = (state: RootState) =>
  fromConnections.getSelectedChannel(state.connections)
export const getServer = (state: RootState, serverId: string) =>
  fromConnections.getServer(state.connections, serverId)
export const getChannel = (
  state: RootState,
  serverId: string,
  channelId: string
) => fromConnections.getChannel(state.connections, serverId, channelId)
export const getChannelByName = (
  state: RootState,
  serverId: string,
  channel: string
) => fromConnections.getChannelByName(state.connections, serverId, channel)
