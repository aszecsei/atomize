import * as React from 'react'

import { Sidebar } from '../layout/sidebar'
import ServerSearch from '../server-search'
import { Scrollbars } from 'react-custom-scrollbars'
import { css } from '@emotion/core'
import styled from '@emotion/styled'
import { themeValues, fontWeights } from '../../theme'

const ScrollbarsStyle = css`
  position: relative;
  display: flex;
  height: 100%;
  flex: 1 1 auto;
  min-height: 0;
`

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
  box-sizing: border-box;
  display: block;
  padding: 1px 0;
  border-radius: 4px;
  transition: none;
  color: ${props =>
    props.selected ? themeValues.headerSecondary : themeValues.textNormal};
`

const ServerLinkLayout = styled.div<IServerLinkProps>`
  display: flex;
  align-items: center;
  border-radius: 4px;
  height: 42px;
  padding: 0 8px;
  background-color: ${props =>
    props.selected ? themeValues.backgroundModifierSelected : null};
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
    <Scrollbars css={ScrollbarsStyle}>
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
