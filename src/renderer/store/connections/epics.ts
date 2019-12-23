import { Epic, combineEpics } from 'redux-observable'
import { ignoreElements } from 'rxjs/operators'
import { CONNECT_TO_SERVER } from './types'

const connectToServerEpic: Epic = (action$, state$) => {
  return action$.ofType(CONNECT_TO_SERVER).pipe(ignoreElements())
}

export const connectionsEpic = combineEpics(connectToServerEpic)
