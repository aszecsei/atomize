import {
  SET_MODE,
  SET_SIZE,
  GuiActionTypes,
  ModeOptions,
  SizeOptions,
} from './types'

export function setMode(newMode: ModeOptions): GuiActionTypes {
  return {
    type: SET_MODE,
    payload: newMode,
  }
}

export function setSize(newSize: SizeOptions): GuiActionTypes {
  return {
    type: SET_SIZE,
    payload: newSize,
  }
}
