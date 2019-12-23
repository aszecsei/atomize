import * as React from 'react'
import { ThemeProvider } from './theme'

import { Provider } from 'react-redux'
import store from './store'

import { backgroundColor } from './theme'
import styled from '@emotion/styled'

import ToggleTheme from './components/ThemeSwitcher'

const Header = styled.h1`
  background-color: ${backgroundColor};
`

export const App = () => (
  <Provider store={store}>
    <ThemeProvider>
      <Header>Hello, world!</Header>
    </ThemeProvider>
    <ToggleTheme />
  </Provider>
)
