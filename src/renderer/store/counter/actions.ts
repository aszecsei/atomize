import { INCREMENT, RESET, CounterActionTypes } from './types'

export function increment(): CounterActionTypes {
  return {
    type: INCREMENT,
  }
}

export function reset(): CounterActionTypes {
  return {
    type: RESET,
  }
}
