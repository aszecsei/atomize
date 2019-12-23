export interface ISettingsState {
  readonly scrollback: boolean
  readonly scrollbackLines?: number
  readonly timestamps: boolean
  readonly timeFormat?: string
  readonly urlgrabber: boolean
  readonly maxurl: number
  readonly autoaway: boolean
  readonly defquit: string
  readonly defleave: string
  readonly defaway: string
  readonly showawayonce: boolean
  readonly hidejoin: boolean
  readonly hidenicknamechange: boolean
  readonly downloadFolder: string
  readonly soundChannel: boolean
  readonly soundPrivate: boolean

  readonly userName: string
  readonly realName: string
}

// Actions

export const EDIT_SETTINGS = 'EDIT_SETTINGS'

interface IEditSettingsAction {
  type: typeof EDIT_SETTINGS
  payload: Partial<ISettingsState>
}

export type SettingsActionTypes = IEditSettingsAction
