import * as React from 'react'

import { Sidebar } from '../layout/sidebar'
import ServerSearch from '../server-search'
import Scrollbars from '../scrollbars'
import styled from '@emotion/styled'
import { themeValues, fontWeights } from '../../theme'
import { unselectable } from '../utils'

const Padding = styled.div`
  width: 100%;
  height: 8px;
`

interface IServerLinkProps {
  selected?: boolean
}
const ServerLink = styled.a<IServerLinkProps>`
  max-width: 224px;
  margin-left: 8px;
  margin-right: 8px;
  box-sizing: border-box;
  display: block;
  padding: 1px 0;
  padding-right: 8px;
  border-radius: 4px;
  transition: none;
  color: ${props =>
    props.selected
      ? themeValues.interactiveActive
      : themeValues.channelsDefault};
  &:hover {
    color: ${props =>
      props.selected
        ? themeValues.interactiveActive
        : themeValues.interactiveHover};
  }
  &:active {
    color: ${props =>
      props.selected
        ? themeValues.interactiveActive
        : themeValues.interactiveActive};
  }
`

const ServerLinkLayout = styled.div<IServerLinkProps>`
  display: flex;
  align-items: center;
  border-radius: 4px;
  height: 42px;
  padding: 0 8px;
  background-color: ${props =>
    props.selected ? themeValues.backgroundModifierSelected : null};
  &:hover {
    background-color: ${props =>
      props.selected
        ? themeValues.backgroundModifierSelected
        : themeValues.backgroundModifierHover};
  }
  &:active {
    background-color: ${props =>
      props.selected
        ? themeValues.backgroundModifierSelected
        : themeValues.backgroundModifierActive};
  }
  ${unselectable}
`

const ServerName = styled.div`
  font-size: 16px;
  line-height: 20px;
  font-weight: ${fontWeights.normal};
  flex: 0 1 auto;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`

interface ILeftPanelProps {}

const LeftPanel = (props: ILeftPanelProps) => (
  <Sidebar>
    <ServerSearch />
    <Scrollbars>
      <Padding />
      {[...Array(30).keys()].map(n => (
        <ServerLink key={n} selected={n == 0}>
          <ServerLinkLayout selected={n == 0}>
            <ServerName>Server {n}</ServerName>
          </ServerLinkLayout>
        </ServerLink>
      ))}
    </Scrollbars>
  </Sidebar>
)

export default LeftPanel
