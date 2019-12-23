import {
  ISystemState,
  SystemActionTypes,
  TOGGLE_ADD_SERVER_MODAL,
  SET_ADD_SERVER_MODAL,
} from './types'
import produce from 'immer'

const initialState: ISystemState = {
  addServerModal: false,
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
    default:
      return state
  }
}

export default systemReducer

export const isAddServerModalOpen = (state: ISystemState) =>
  state.addServerModal
