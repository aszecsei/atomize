import {
  ChatState,
  ChatActionTypes,
  SEND_MESSAGE,
  DELETE_MESSAGE,
} from './types'
import produce from 'immer'

const initialState: ChatState = {
  messages: [],
}

export function chatReducer(
  state = initialState,
  action: ChatActionTypes
): ChatState {
  switch (action.type) {
    case SEND_MESSAGE:
      return produce(state, draft => {
        draft.messages.push(action.payload)
      })
    case DELETE_MESSAGE:
      return produce(state, draft => {
        draft.messages = draft.messages.filter(
          x => x.timestamp !== action.meta.timestamp
        )
      })
    default:
      return state
  }
}
