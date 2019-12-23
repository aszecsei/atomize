import { IThemeState, GuiActionTypes, SET_MODE, SET_SIZE } from './types'
import produce from 'immer'

const initialState: IThemeState = {
  mode: 'dark',
  size: 'cozy',
}

export function guiReducer(
  state = initialState,
  action: GuiActionTypes
): IThemeState {
  switch (action.type) {
    case SET_MODE:
      return produce(state, draft => {
        draft.mode = action.payload
      })
    case SET_SIZE:
      return produce(state, draft => {
        draft.size = action.payload
      })
    default:
      return state
  }
}

export const modeSelector = (state: IThemeState) => state.mode
export const sizeSelector = (state: IThemeState) => state.size
