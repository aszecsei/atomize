/** @jsx jsx */
import { jsx } from '@emotion/core'
import * as React from 'react'

import { Icon } from '../layout/icon'
import { Sidebar } from '../layout/sidebar'
import ServerSearch from '../server-search'
import Scrollbars from '../scrollbars'
import styled from '@emotion/styled'
import { css } from '@emotion/core'
import { themeValues, fontWeights } from '../../theme'
import { unselectable } from '../utils'

import { MdSettings } from 'react-icons/md'
import { FaCaretDown, FaHashtag } from 'react-icons/fa'

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
  cursor: pointer;
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
  display: flex;
`

const ChannelName = styled(ServerName)`
  margin-left: 30px;
`

interface ILeftPanelProps {
  editSettings: () => void
}

const LeftPanel = (props: ILeftPanelProps) => (
  <Sidebar>
    <ServerSearch />
    <Padding />
    <ServerLink onClick={props.editSettings}>
      <ServerLinkLayout>
        <ServerName>
          <Icon>
            <MdSettings />
          </Icon>
          <span
            css={css`
              margin-left: 8px;
              margin-top: 2px;
            `}
          >
            Settings
          </span>
        </ServerName>
      </ServerLinkLayout>
    </ServerLink>
    <Scrollbars>
      <Padding />
      {[...Array(30).keys()].map(n => (
        <React.Fragment key={n}>
          <ServerLink key={n} selected={n == 0}>
            <ServerLinkLayout selected={n == 0}>
              <ServerName>
                <Icon>
                  <FaCaretDown />
                </Icon>
                <span
                  css={css`
                    margin-left: 8px;
                    margin-top: 2px;
                  `}
                >
                  Server {n}
                </span>
              </ServerName>
            </ServerLinkLayout>
          </ServerLink>
          {[...Array(3).keys()].map(nc => (
            <ServerLink key={`channel${nc}`}>
              <ServerLinkLayout>
                <ChannelName>
                  <Icon>
                    <FaHashtag />
                  </Icon>
                  <span
                    css={css`
                      margin-left: 8px;
                      margin-top: 2px;
                    `}
                  >
                    Channel {nc}
                  </span>
                </ChannelName>
              </ServerLinkLayout>
            </ServerLink>
          ))}
        </React.Fragment>
      ))}
    </Scrollbars>
  </Sidebar>
)

export default LeftPanel
