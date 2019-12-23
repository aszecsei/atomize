import { chatReducer } from './chat/reducers'
import { guiReducer } from './gui/reducers'
import { combineReducers, createStore } from 'redux'

export const rootReducer = combineReducers({
  chat: chatReducer,
  gui: guiReducer,
})

export type RootState = ReturnType<typeof rootReducer>

export const guiSelector = (state: RootState) => state.gui
export const chatSelector = (state: RootState) => state.chat

const store = createStore(rootReducer)
export default store
