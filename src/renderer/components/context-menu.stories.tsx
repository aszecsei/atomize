import React from 'react'
import { action } from '@storybook/addon-actions'
import { ContextMenu, ItemGroup, Item, Label } from './context-menu'

import { ThemeProvider } from 'emotion-theming'

export default {
  component: ContextMenu,
  title: 'Context Menu',
}

export const Basic = () => (
  <ThemeProvider theme={{ mode: 'dark', size: 'cozy' }}>
    <ContextMenu>
      <ItemGroup>
        <Item onClick={action('clicked')} role="button">
          <Label>Item 1</Label>
        </Item>
        <Item onClick={action('clicked')} role="button">
          <Label>Item 2</Label>
        </Item>
      </ItemGroup>
      <ItemGroup>
        <Item onClick={action('clicked')} role="button">
          <Label>Item 3</Label>
        </Item>
        <Item onClick={action('clicked')} role="button" itemStyle="danger">
          <Label>Item 4</Label>
        </Item>
      </ItemGroup>
    </ContextMenu>
  </ThemeProvider>
)
