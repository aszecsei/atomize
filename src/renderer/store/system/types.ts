export interface ISystemState {
  addServerModal: boolean
  addChannelModal: boolean
  editSettingsModal: boolean
}

// ACTIONS

export const TOGGLE_ADD_SERVER_MODAL = 'TOGGLE_ADD_SERVER_MODAL'
export const SET_ADD_SERVER_MODAL = 'SET_ADD_SERVER_MODAL'

export const TOGGLE_ADD_CHANNEL_MODAL = 'TOGGLE_ADD_CHANNEL_MODAL'
export const SET_ADD_CHANNEL_MODAL = 'SET_ADD_CHANNEL_MODAL'

export const TOGGLE_EDIT_SETTINGS_MODAL = 'TOGGLE_EDIT_SETTINGS_MODAL'
export const SET_EDIT_SETTINGS_MODAL = 'SET_EDIT_SETTINGS_MODAL'

interface IToggleAddServerModal {
  type: typeof TOGGLE_ADD_SERVER_MODAL
}

interface ISetAddServerModal {
  type: typeof SET_ADD_SERVER_MODAL
  value: boolean
}

interface IToggleAddChannelModal {
  type: typeof TOGGLE_ADD_CHANNEL_MODAL
}

interface ISetAddChannelModal {
  type: typeof SET_ADD_CHANNEL_MODAL
  value: boolean
}

interface IToggleEditSettingsModal {
  type: typeof TOGGLE_EDIT_SETTINGS_MODAL
}

interface ISetEditSettingsModal {
  type: typeof SET_EDIT_SETTINGS_MODAL
  value: boolean
}

export type SystemActionTypes =
  | IToggleAddServerModal
  | ISetAddServerModal
  | IToggleAddChannelModal
  | ISetAddChannelModal
  | IToggleEditSettingsModal
  | ISetEditSettingsModal
