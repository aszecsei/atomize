import {
  SystemActionTypes,
  TOGGLE_ADD_SERVER_MODAL,
  SET_ADD_SERVER_MODAL,
  TOGGLE_ADD_CHANNEL_MODAL,
  SET_ADD_CHANNEL_MODAL,
  TOGGLE_EDIT_SETTINGS_MODAL,
  SET_EDIT_SETTINGS_MODAL,
} from './types'

export function toggleAddServerModal(): SystemActionTypes {
  return {
    type: TOGGLE_ADD_SERVER_MODAL,
  }
}

export function setAddServerModal(value: boolean): SystemActionTypes {
  return {
    type: SET_ADD_SERVER_MODAL,
    value,
  }
}

export function toggleAddChannelModal(): SystemActionTypes {
  return {
    type: TOGGLE_ADD_CHANNEL_MODAL,
  }
}

export function setAddChannelModal(value: boolean): SystemActionTypes {
  return {
    type: SET_ADD_CHANNEL_MODAL,
    value,
  }
}

export function toggleEditSettingsModal(): SystemActionTypes {
  return {
    type: TOGGLE_EDIT_SETTINGS_MODAL,
  }
}

export function setEditSettingsModal(value: boolean): SystemActionTypes {
  return {
    type: SET_EDIT_SETTINGS_MODAL,
    value,
  }
}
