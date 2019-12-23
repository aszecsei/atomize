import * as React from 'react'
import { ThemeProvider as SThemeProvider } from 'emotion-theming'

import { ModeOptions, SizeOptions } from '../../store/gui/types'
import { modeSelector, sizeSelector } from '../../store/gui/reducers'
import { RootState, guiSelector } from '../../store'
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
  let gui = guiSelector(state)
  return {
    mode: modeSelector(gui),
    size: sizeSelector(gui),
  }
}

export default connect(mapState)(ThemeProvider)
