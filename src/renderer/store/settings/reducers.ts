import { ISettingsState, SettingsActionTypes, EDIT_SETTINGS } from './types'

import { remote } from 'electron'
import * as path from 'path'

const initialState: ISettingsState = {
  scrollback: true,
  scrollbackLines: 500,
  timestamps: true,
  timeFormat: 'mm/dd/yy hh:MM TT',
  urlgrabber: true,
  maxurl: 50,
  autoaway: true,
  defquit: 'Leaving',
  defleave: 'Leaving',
  defaway: 'Away',
  showawayonce: true,
  hidejoin: false,
  hidenicknamechange: false,
  downloadFolder: path.join(remote.app.getPath('home'), 'Downloads'),
  soundChannel: true,
  soundPrivate: true,

  userName: 'atomize',
  realName: 'atomize IRC client',
}

function settingsReducer(
  state = initialState,
  action: SettingsActionTypes
): ISettingsState {
  switch (action.type) {
    case EDIT_SETTINGS:
      return { ...state, ...action.payload }
    default:
      return state
  }
}
export default settingsReducer
