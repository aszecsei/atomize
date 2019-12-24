import * as React from 'react'

import { Provider } from 'react-redux'
import store from './store'

import ThemeProvider from './components/theme-provider'
import Global from './global-styles'

import { Content } from './components/layout/content'
import LeftPanel from './components/left-panel'
import MainPanel from './components/main'

export const App = () => (
  <Provider store={store}>
    <ThemeProvider>
      <Global />
      <Content>
        <LeftPanel />
        <MainPanel messages={[]} />
      </Content>
    </ThemeProvider>
  </Provider>
)
