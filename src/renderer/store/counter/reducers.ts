import { INCREMENT, RESET, ICounterState, CounterActionTypes } from './types'
import produce from 'immer'

const initialState: ICounterState = {
  value: 0,
}

export function counterReducer(
  state = initialState,
  action: CounterActionTypes
): ICounterState {
  switch (action.type) {
    case INCREMENT:
      return produce(state, draft => {
        draft.value += 1
      })
    case RESET:
      return produce(state, draft => {
        draft.value = 0
      })
    default:
      return state
  }
}

export const valueSelector = (state: ICounterState) => state.value
