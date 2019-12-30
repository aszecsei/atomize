import React from 'react'
import styled from '@emotion/styled'
import { css } from '@emotion/core'

import { remote } from 'electron'

import { colors, themeValues } from '../theme'

interface ITitlebarContainerProps {
  draggable?: boolean
}

const TitlebarContainer = styled.div<ITitlebarContainerProps>`
  margin: 0;
  color: ${colors.white};
  background-color: ${themeValues.backgroundTertiary};
  ${props =>
    props.draggable &&
    css`
      -webkit-app-region: drag;
      -webkit-user-select: none;
      user-select: none;
    `}
  &::after {
    content: ' ';
    display: table;
    clear: both;
  }
  display: flex;
  flex-direction: row;
  align-items: center;
`

const TitlebarStoplight = styled.div`
  flex: 0 0;
  min-width: 90px;
  &::after {
    content: ' ';
    display: table;
    clear: both;
  }
`

const TitlebarButtons = css`
  float: left;
  width: 30px;
  height: 20px;
  &:hover {
    background-color: ${colors.red};
  }
  -webkit-app-region: no-drag;
  position: relative;
`

const TitlebarMinimize = styled.div`
  ${TitlebarButtons};
  border-color: white;
  padding-bottom: 5px;
  &::after {
    content: '🗕';
    color: ${colors.white};
    position: absolute;
    font-size: 15px;
    top: 1px;
    left: 7px;
  }
`

interface ITitlebarMaximizeProps {
  isMaximized: boolean
}
const TitlebarMaximize = styled.div<ITitlebarMaximizeProps>`
  ${TitlebarButtons};
  &::after {
    color: ${colors.white};
    position: absolute;
    font-size: 15px;
    top: 1px;
    left: 9px;
  }

  ${props =>
    props.isMaximized
      ? css`
          &::after {
            content: '🗗';
          }
        `
      : css`
          &::after {
            content: '🗖';
          }
        `}
`

const TitlebarClose = styled.div`
  ${TitlebarButtons};
  &::after {
    content: '🗙';
    color: ${colors.white};
    position: absolute;
    font-size: 15px;
    top: 1px;
    left: 6px;
  }
`

const TitlebarChildren = styled.div`
  display: flex;
  margin: 0;
  flex: 1 1 auto;
  justify-content: center;
  align-items: center;
`

const handleClose = () => {
  remote.getCurrentWindow().close()
}

const handleMinimize = () => {
  remote.getCurrentWindow().minimize()
}

const handleMaximize = () => {
  const win = remote.getCurrentWindow()
  if (!win.isMaximized()) {
    win.maximize()
  } else {
    win.unmaximize()
  }
}

interface ITitlebarProps {
  draggable?: boolean
}

interface ITitlebarState {
  isMaximized: boolean
}

class Titlebar extends React.Component<ITitlebarProps, ITitlebarState> {
  constructor(props: ITitlebarProps) {
    super(props)

    this.state = {
      isMaximized: remote.getCurrentWindow().isMaximized(),
    }
  }

  componentDidMount() {
    remote.getCurrentWindow().on('maximize', this.onMaximize)
    remote.getCurrentWindow().on('unmaximize', this.onUnmaximize)
  }

  componentWillUnmount() {
    remote.getCurrentWindow().removeListener('maximize', this.onMaximize)
    remote.getCurrentWindow().removeListener('unmaximize', this.onUnmaximize)
  }

  onMaximize = () => {
    this.setState({ isMaximized: true })
  }
  onUnmaximize = () => {
    this.setState({ isMaximized: false })
  }

  handleEvent = (fn?: () => void) => (e: any) => {
    e.preventDefault()
    e.stopPropagation()
    fn?.()
  }

  render() {
    return (
      <TitlebarContainer draggable={this.props.draggable}>
        <TitlebarChildren>{this.props.children}</TitlebarChildren>
        <TitlebarStoplight>
          <TitlebarMinimize
            onDoubleClick={this.handleEvent()}
            onClick={this.handleEvent(handleMinimize)}
          />
          <TitlebarMaximize
            onDoubleClick={this.handleEvent()}
            onClick={this.handleEvent(handleMaximize)}
            isMaximized={this.state.isMaximized}
          />
          <TitlebarClose
            onDoubleClick={this.handleEvent()}
            onClick={this.handleEvent(handleClose)}
          />
        </TitlebarStoplight>
      </TitlebarContainer>
    )
  }
}

export default Titlebar
