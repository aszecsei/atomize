import * as React from 'react'

import { Provider } from 'react-redux'
import store from './store'

import ThemeProvider from './containers/theme-provider'
import Global from './global-styles'

import { Content } from './components/layout/content'
import LeftPanel from './containers/left-panel'
import MainPanel from './containers/main'

import AddServerModal from './containers/add-server-modal'
import SettingsModal from './containers/settings-modal'

import { setup } from './persistence'

setup()

export const App = () => (
  <Provider store={store}>
    <ThemeProvider>
      <Global />
      <SettingsModal />
      <AddServerModal />
      <Content>
        <LeftPanel />
        <MainPanel />
      </Content>
    </ThemeProvider>
  </Provider>
)
