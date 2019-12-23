import * as React from 'react'
import { ModeOptions } from '../../store/gui/types'

interface IThemeSwitcherProps {
  mode: ModeOptions
  setMode: (newMode: ModeOptions) => void
}

export const ThemeSwitcher = (props: IThemeSwitcherProps) => (
  <button
    value="Toggle!"
    onClick={() => {
      if (props.mode === 'dark') {
        props.setMode('light')
      } else {
        props.setMode('dark')
      }
    }}
  >
    Switch!
  </button>
)

export default ThemeSwitcher
