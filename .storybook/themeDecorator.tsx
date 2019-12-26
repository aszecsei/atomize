import React from 'react'
import { ThemeProvider } from 'emotion-theming'
import GlobalStyles from '../src/renderer/global-styles'

const ThemeDecorator = (storyFn: any) => (
  <ThemeProvider theme={{ mode: 'dark', size: 'cozy' }}>
    <GlobalStyles />
    {storyFn()}
  </ThemeProvider>
)

export default ThemeDecorator
