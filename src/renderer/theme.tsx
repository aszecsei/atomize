import * as React from 'react'
import { ThemeProvider as SThemeProvider } from 'emotion-theming'
import { RootState, guiSelector } from './store'
import { modeSelector, sizeSelector } from './store/gui/reducers'
import { connect } from 'react-redux'

import { ModeOptions, SizeOptions } from './store/gui/types'

export const colors = {
  navy: '#001f3f',
  blue: '#0074D9',
  aqua: '#7FDBFF',
  teal: '#39CCCC',
  olive: '#3D9970',
  green: '#2ECC40',
  lime: '#01FF70',
  yellow: '#FFDC00',
  orange: '#FF851B',
  red: '#FF4136',
  maroon: '#85144b',
  fuchsia: '#F012BE',
  purple: '#B10DC9',
  black: '#111111',
  gray: '#AAAAAA',
  silver: '#DDDDDD',
  white: '#FFFFFF',
}

export const fontWeights = {
  light: 300,
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
}

export const backgroundColor = colors.white

export const font =
  "'Open Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'"

// ========== Custom theme provider using redux

interface IThemeProviderProps {
  mode: ModeOptions
  size: SizeOptions
}

const ThemeProviderDisplay: React.FunctionComponent<IThemeProviderProps> = ({
  mode,
  size,
  children,
}) => <SThemeProvider theme={{ mode, size }}>{children}</SThemeProvider>

const mapState = (state: RootState) => {
  let gui = guiSelector(state)
  return {
    mode: modeSelector(gui),
    size: sizeSelector(gui),
  }
}

export const ThemeProvider = connect(mapState)(ThemeProviderDisplay)
