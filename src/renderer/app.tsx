import * as React from 'react'

import { Provider } from 'react-redux'
import store from './store'

import ThemeProvider from './components/theme-provider'
import Global from './global-styles'

import { Columns } from './components/base/column'
import LeftPanel from './components/left-panel'
import MainPanel from './components/main'
import RightPanel from './components/right-panel'

export const App = () => (
  <Provider store={store}>
    <ThemeProvider>
      <Global />
      <Columns>
        <LeftPanel />
        <MainPanel />
        <RightPanel />
      </Columns>
    </ThemeProvider>
  </Provider>
)
