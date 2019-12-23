import { counterReducer } from './counter/reducers'
import { guiReducer } from './gui/reducers'
import { combineReducers, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

export const rootReducer = combineReducers({
  counter: counterReducer,
  gui: guiReducer,
})

export type RootState = ReturnType<typeof rootReducer>

export const counterSelector = (state: RootState) => state.counter
export const guiSelector = (state: RootState) => state.gui

const store = createStore(rootReducer, composeWithDevTools())
export default store
