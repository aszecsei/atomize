import {
  ISystemState,
  SystemActionTypes,
  TOGGLE_ADD_SERVER_MODAL,
  SET_ADD_SERVER_MODAL,
  TOGGLE_ADD_CHANNEL_MODAL,
  SET_ADD_CHANNEL_MODAL,
  TOGGLE_EDIT_SETTINGS_MODAL,
  SET_EDIT_SETTINGS_MODAL,
} from './types'
import produce from 'immer'

const initialState: ISystemState = {
  addServerModal: false,
  addChannelModal: false,
  editSettingsModal: false,
}

function systemReducer(
  state = initialState,
  action: SystemActionTypes
): ISystemState {
  switch (action.type) {
    case TOGGLE_ADD_SERVER_MODAL:
      return produce(state, draft => {
        draft.addServerModal = !draft.addServerModal
      })
    case SET_ADD_SERVER_MODAL:
      return produce(state, draft => {
        draft.addServerModal = action.value
      })
    case TOGGLE_ADD_CHANNEL_MODAL:
      return produce(state, draft => {
        draft.addChannelModal = !draft.addChannelModal
      })
    case SET_ADD_CHANNEL_MODAL:
      return produce(state, draft => {
        draft.addChannelModal = action.value
      })
    case TOGGLE_EDIT_SETTINGS_MODAL:
      return produce(state, draft => {
        draft.editSettingsModal = !draft.editSettingsModal
      })
    case SET_EDIT_SETTINGS_MODAL:
      return produce(state, draft => {
        draft.editSettingsModal = action.value
      })
    default:
      return state
  }
}

export default systemReducer

export const getAddServerModalOpen = (state: ISystemState) =>
  state.addServerModal
export const getAddChannelModalOpen = (state: ISystemState) =>
  state.addChannelModal
export const getEditSettingsModalOpen = (state: ISystemState) =>
  state.editSettingsModal
