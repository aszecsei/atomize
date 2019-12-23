import * as React from 'react'

import { Provider } from 'react-redux'
import store from './store'

import ThemeProvider from './components/theme-provider'

import Counter from './components/counter'
import ThemeSwitcher from './components/theme-switcher'

export const App = () => (
  <Provider store={store}>
    <ThemeProvider>
      <h1>Hello, world!</h1>
      <Counter />
      <ThemeSwitcher />
    </ThemeProvider>
  </Provider>
)
