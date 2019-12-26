import * as React from 'react'
import { ThemeProvider as SThemeProvider } from 'emotion-theming'

import { ModeOptions, SizeOptions } from '../../store/gui/types'
import { getThemeMode, getThemeSize, RootState } from '../../store'
import { connect } from 'react-redux'

interface IThemeProviderProps {
  mode: ModeOptions
  size: SizeOptions
}

const ThemeProvider: React.FunctionComponent<IThemeProviderProps> = ({
  mode,
  size,
  children,
}) => <SThemeProvider theme={{ mode, size }}>{children}</SThemeProvider>

const mapState = (state: RootState) => {
  return {
    mode: getThemeMode(state),
    size: getThemeSize(state),
  }
}

export default connect(mapState)(ThemeProvider)
