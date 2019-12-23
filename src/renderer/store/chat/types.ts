export interface Message {
  readonly user: string
  readonly message: string
  readonly timestamp: number
}

export interface ChatState {
  readonly messages: Message[]
}

// Actions

export const SEND_MESSAGE = 'SEND_MESSAGE'
export const DELETE_MESSAGE = 'DELETE_MESSAGE'

interface ISendMessageAction {
  type: typeof SEND_MESSAGE
  payload: Message
}

interface IDeleteMessageAction {
  type: typeof DELETE_MESSAGE
  meta: {
    timestamp: number
  }
}

export type ChatActionTypes = ISendMessageAction | IDeleteMessageAction
