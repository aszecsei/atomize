/** @jsx jsx */
import { jsx } from '@emotion/core'
import * as React from 'react'
import * as ReactDOM from 'react-dom'

import { Icon } from '../../components/layout/icon'
import { Sidebar } from '../../components/layout/sidebar'
import ServerSearch from '../server-search'
import Scrollbars from '../../components/scrollbars'
import styled from '@emotion/styled'
import { css } from '@emotion/core'
import { themeValues, fontWeights } from '../../theme'
import { unselectable } from '../../components/utils'
import { Popper } from 'react-popper'
import * as ContextMenu from '../../components/context-menu'
import OutsideClickHandler from 'react-outside-click-handler'

import { MdAdd, MdSettings } from 'react-icons/md'
import {
  FaCaretDown,
  FaCaretRight,
  FaHashtag,
  FaRegTimesCircle,
  FaRegCheckCircle,
  FaRegHourglass,
} from 'react-icons/fa'
import {
  IChannel,
  IServer,
  ConnectionStatus,
} from '../../store/connections/types'

const getIcon = (status: ConnectionStatus) => {
  switch (status) {
    case ConnectionStatus.NotConnected:
      return <FaRegTimesCircle />
    case ConnectionStatus.Connecting:
      return <FaRegHourglass />
    case ConnectionStatus.Connected:
      return <FaRegCheckCircle />
  }
}

const makeVirtualReference = (
  x: number,
  y: number,
  width: number = 0,
  height: number = 0
) => ({
  getBoundingClientRect: () => ({
    top: y,
    left: x,
    bottom: y + height,
    right: x + width,
    width,
    height,
  }),
  clientWidth: () => width,
  clientHeight: () => height,
})

const Divider = styled.div`
  border-bottom: 1px solid ${themeValues.backgroundModifierAccent};
  margin: 8px;
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
  flex: 1 1 auto;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  display: flex;
`

const ChannelName = styled(ServerName)`
  margin-left: 30px;
`

interface IChannelProps {
  channel: IChannel
  selectedServerId?: string
  selectedChannelId?: string
  selectChannel: (channelId: string) => void
}

class Channel extends React.Component<IChannelProps, {}> {
  render() {
    return (
      <ServerLink
        selected={this.props.channel.id === this.props.selectedChannelId}
        onClick={() => this.props.selectChannel(this.props.channel.id)}
      >
        <ServerLinkLayout
          selected={this.props.channel.id === this.props.selectedChannelId}
        >
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
              {this.props.channel.name}
            </span>
            <Icon
              css={css`
                margin-left: auto;
              `}
            >
              {getIcon(this.props.channel.connected)}
            </Icon>
          </ChannelName>
        </ServerLinkLayout>
      </ServerLink>
    )
  }
}

interface IServerProps {
  server: IServer
  selectedServerId?: string
  selectedChannelId?: string
  selectServer: (serverId: string) => void
  selectChannel: (serverId: string, channelId: string) => void
  connectToServer: (serverId: string) => void
  disconnectFromServer: (serverId: string) => void
  removeServer: (serverId: string) => void
}

interface IServerState {
  expanded: boolean
  contextReferenceElement?: ReturnType<typeof makeVirtualReference>
}

class Server extends React.Component<IServerProps, IServerState> {
  state = {
    expanded: true,
    contextReferenceElement: undefined,
  }

  render() {
    const f = (
      <ServerLink
        onClick={() => this.setState({ expanded: !this.state.expanded })}
        onContextMenu={e => {
          this.setState({
            contextReferenceElement: makeVirtualReference(
              e.pageX,
              e.pageY,
              1,
              1
            ),
          })
          e.preventDefault()
        }}
      >
        {this.state.contextReferenceElement !== undefined
          ? ReactDOM.createPortal(
              <Popper
                referenceElement={this.state.contextReferenceElement}
                placement="bottom-start"
                positionFixed
              >
                {({ ref, style, placement }) => (
                  <OutsideClickHandler
                    onOutsideClick={() => {
                      this.setState({ contextReferenceElement: undefined })
                    }}
                  >
                    <ContextMenu.ContextMenu
                      ref={ref}
                      style={style}
                      data-placement={placement}
                      onClick={e => e.stopPropagation()}
                    >
                      <ContextMenu.ItemGroup>
                        {this.props.server.connected ? (
                          <ContextMenu.Item
                            onClick={() => {
                              this.props.disconnectFromServer(
                                this.props.server.id
                              )
                              this.setState({
                                contextReferenceElement: undefined,
                              })
                            }}
                          >
                            <ContextMenu.Label>Disconnect</ContextMenu.Label>
                          </ContextMenu.Item>
                        ) : (
                          <ContextMenu.Item
                            onClick={() => {
                              this.props.connectToServer(this.props.server.id)
                              this.setState({
                                contextReferenceElement: undefined,
                              })
                            }}
                          >
                            <ContextMenu.Label>Connect</ContextMenu.Label>
                          </ContextMenu.Item>
                        )}
                      </ContextMenu.ItemGroup>
                      <ContextMenu.ItemGroup>
                        <ContextMenu.Item>
                          <ContextMenu.Label>Add Channel</ContextMenu.Label>
                        </ContextMenu.Item>
                        <ContextMenu.Item>
                          <ContextMenu.Label>Edit Settings</ContextMenu.Label>
                        </ContextMenu.Item>
                        <ContextMenu.Item
                          itemStyle="danger"
                          onClick={() => {
                            this.props.removeServer(this.props.server.id)
                            this.setState({
                              contextReferenceElement: undefined,
                            })
                          }}
                        >
                          <ContextMenu.Label>Delete Server</ContextMenu.Label>
                        </ContextMenu.Item>
                      </ContextMenu.ItemGroup>
                    </ContextMenu.ContextMenu>
                  </OutsideClickHandler>
                )}
              </Popper>,
              document.querySelector('#popouts')!
            )
          : null}
        <ServerLinkLayout>
          <ServerName>
            <Icon>
              {this.state.expanded ? <FaCaretDown /> : <FaCaretRight />}
            </Icon>
            <span
              css={css`
                margin-left: 8px;
                margin-top: 2px;
              `}
            >
              {this.props.server.name}
            </span>
            <Icon
              css={css`
                margin-left: auto;
              `}
            >
              {getIcon(this.props.server.connected)}
            </Icon>
          </ServerName>
        </ServerLinkLayout>
      </ServerLink>
    )
    if (this.state.expanded) {
      return (
        <React.Fragment>
          {f}
          {this.props.server.channels.map((c, idx) => (
            <Channel
              channel={c}
              key={idx}
              selectedServerId={this.props.selectedServerId}
              selectedChannelId={this.props.selectedChannelId}
              selectChannel={(channelId: string) =>
                this.props.selectChannel(this.props.server.id, channelId)
              }
            />
          ))}
        </React.Fragment>
      )
    } else {
      return f
    }
  }
}

interface ILeftPanelProps {
  servers: IServer[]
  selectedServerId?: string
  selectedChannelId?: string
  editSettings: () => void
  addServer: () => void
  selectServer: (serverId: string) => void
  selectChannel: (serverId: string, channelId: string) => void
  connectToServer: (serverId: string) => void
  disconnectFromServer: (serverId: string) => void
  removeServer: (serverId: string) => void
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
    <ServerLink onClick={props.addServer}>
      <ServerLinkLayout>
        <ServerName>
          <Icon>
            <MdAdd />
          </Icon>
          <span
            css={css`
              margin-left: 8px;
              margin-top: 2px;
            `}
          >
            Add Server
          </span>
        </ServerName>
      </ServerLinkLayout>
    </ServerLink>
    <Divider />
    <Scrollbars>
      <Padding />
      {props.servers.map((s, idx) => (
        <Server
          server={s}
          key={idx}
          selectedServerId={props.selectedServerId}
          selectedChannelId={props.selectedChannelId}
          selectChannel={props.selectChannel}
          selectServer={props.selectServer}
          connectToServer={props.connectToServer}
          disconnectFromServer={props.disconnectFromServer}
          removeServer={props.removeServer}
        />
      ))}
    </Scrollbars>
  </Sidebar>
)

export default LeftPanel
