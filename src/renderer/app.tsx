import * as React from 'react'

import { Provider } from 'react-redux'
import store from './store'

import ThemeProvider from './components/theme-provider'
import Global from './global-styles'

import Titlebar from './components/titlebar'
import { Content } from './components/layout/content'
import LeftPanel from './components/left-panel'
import MainPanel from './components/main'

import AddServerModal from './components/add-server-modal'
import SettingsModal from './components/settings-modal'

import { setup } from './persistence'

import styled from '@emotion/styled'

const AppWrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
`

setup()

export const App = () => (
  <AppWrapper>
    <Provider store={store}>
      <ThemeProvider>
        <Global />
        <Titlebar draggable>atomize</Titlebar>
        <SettingsModal />
        <AddServerModal />
        <Content>
          <LeftPanel />
          <MainPanel />
        </Content>
      </ThemeProvider>
    </Provider>
  </AppWrapper>
)
