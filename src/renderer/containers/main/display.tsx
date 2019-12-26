import * as React from 'react'

import styled from '@emotion/styled'
import { Scrollbars } from 'react-custom-scrollbars'

import ServerSearch from '../server-search'
import Message from '../message'
import MessageEntry from '../message-entry'
import { Chat } from '../../components/layout/chat'

import { IMessage } from '../../store/connections/types'

interface IMessageWindowProps {
  messages?: IMessage[]
}

const Padding = styled.div`
  width: 100%;
  height: 8px;
`

class MessageWindow extends React.Component<IMessageWindowProps, {}> {
  private scrollRef = React.createRef<Scrollbars>()

  componentDidMount() {
    this.scrollRef.current!.scrollToBottom()
  }

  componentDidUpdate() {
    this.scrollRef.current!.scrollToBottom()
  }

  render() {
    return (
      <Chat>
        <ServerSearch />
        <Scrollbars ref={this.scrollRef}>
          <Padding />
          {this.props.messages?.map((im, id) => (
            <Message message={im} key={id} />
          ))}
        </Scrollbars>
        <MessageEntry />
      </Chat>
    )
  }
}

export default MessageWindow
