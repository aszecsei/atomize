import * as React from 'react'

import styled from '@emotion/styled'
import { Scrollbars } from 'react-custom-scrollbars'

import ServerSearch from '../server-search'
import Message from '../message'
import MessageEntry from '../message-entry'
import { Chat } from '../layout/chat'

import {
  IMessage,
  MessageType,
  parseJoinMessage,
} from '../../store/connections/types'

const fake_msg: IMessage = {
  id: '',
  type: MessageType.MESSAGE,
  text: 'Hello, world! :smile:',
  sender: 'Foo Bar',
  sent: new Date(),
  isMe: false,
}

const fake_system_message: IMessage = parseJoinMessage('Test User', '#channel')

const fake_messages = [...Array(30).keys()].map(i => {
  const isMe = i % 3 == 0

  if (i % 5 == 0) {
    return {
      ...fake_system_message,
      isMe,
    }
  } else {
    return {
      ...fake_msg,
      isMe,
    }
  }
})

interface IMessageWindowProps {
  messages: IMessage[]
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
          {fake_messages.map((im, id) => (
            <Message message={im} key={id} />
          ))}
        </Scrollbars>
        <MessageEntry />
      </Chat>
    )
  }
}

export default MessageWindow
