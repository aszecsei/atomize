import { EDIT_SETTINGS, ISettingsState, SettingsActionTypes } from './types'

export function editSettings(
  newMode: Partial<ISettingsState>
): SettingsActionTypes {
  return {
    type: EDIT_SETTINGS,
    payload: newMode,
  }
}
