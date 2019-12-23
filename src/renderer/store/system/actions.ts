import {
  SystemActionTypes,
  TOGGLE_ADD_SERVER_MODAL,
  SET_ADD_SERVER_MODAL,
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
