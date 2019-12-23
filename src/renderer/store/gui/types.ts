export type ModeOptions = 'dark' | 'light'
export type SizeOptions = 'cozy' | 'compact'

export interface IThemeState {
  readonly mode: ModeOptions
  readonly size: SizeOptions
}

// Actions

export const SET_MODE = 'SET_MODE'
export const SET_SIZE = 'SET_SIZE'

interface ISetModeAction {
  type: typeof SET_MODE
  payload: ModeOptions
}

interface ISetSizeAction {
  type: typeof SET_SIZE
  payload: SizeOptions
}

export type GuiActionTypes = ISetModeAction | ISetSizeAction
