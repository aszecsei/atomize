export interface ISystemState {
  addServerModal: boolean
}

// ACTIONS

export const TOGGLE_ADD_SERVER_MODAL = 'TOGGLE_ADD_SERVER_MODAL'
export const SET_ADD_SERVER_MODAL = 'SET_ADD_SERVER_MODAL'

interface IToggleAddServerModal {
  type: typeof TOGGLE_ADD_SERVER_MODAL
}

interface ISetAddServerModal {
  type: typeof SET_ADD_SERVER_MODAL
  value: boolean
}

export type SystemActionTypes = IToggleAddServerModal | ISetAddServerModal
