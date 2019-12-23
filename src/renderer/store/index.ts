import { connectionsReducer } from './connections/reducers'
import { counterReducer } from './counter/reducers'
import { guiReducer } from './gui/reducers'
import { settingsReducer } from './settings/reducers'
import { combineReducers, createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { connectionsEpic } from './connections/epics'
import { combineEpics, createEpicMiddleware } from 'redux-observable'

export const rootReducer = combineReducers({
  connections: connectionsReducer,
  counter: counterReducer,
  gui: guiReducer,
  settings: settingsReducer,
})

export type RootState = ReturnType<typeof rootReducer>

export const connectionsSelector = (state: RootState) => state.connections
export const counterSelector = (state: RootState) => state.counter
export const guiSelector = (state: RootState) => state.gui
export const settingsSelector = (state: RootState) => state.settings

const rootEpic = combineEpics(connectionsEpic)
const epicMiddleware = createEpicMiddleware()

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(epicMiddleware))
)
epicMiddleware.run(rootEpic)

export default store
