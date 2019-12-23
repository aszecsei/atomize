export interface ICounterState {
  readonly value: number
}

// Actions

export const INCREMENT = 'INCREMENT'
export const RESET = 'RESET'

interface IIncrementAction {
  type: typeof INCREMENT
}

interface IResetAction {
  type: typeof RESET
}

export type CounterActionTypes = IIncrementAction | IResetAction
