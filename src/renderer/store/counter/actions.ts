import { INCREMENT, RESET, ICounterActionTypes } from "./types";

export function increment(): ICounterActionTypes {
  return {
    type: INCREMENT
  };
}

export function reset(): ICounterActionTypes {
  return {
    type: RESET
  };
}
