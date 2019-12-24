import * as React from 'react'

import styled from '@emotion/styled'

import ServerSearch from '../server-search'

import { Chat } from '../layout/chat'
import { IMessage, MessageType } from '../../store/connections/types'
import { fontWeights, themeValues } from '../../theme'
import { Scrollbars } from 'react-custom-scrollbars'

import Message from '../message'

const fake_msg: IMessage = {
  id: '',
  type: MessageType.MESSAGE,
  text: 'Hello, world! :smile:',
  sender: 'Foo Bar',
  sent: new Date(),
  isMe: false,
}

const fake_messages = [...Array(30).keys()].map(i => ({
  ...fake_msg,
  isMe: i % 3 == 0,
}))

interface IMessageWindowProps {
  messages: IMessage[]
}

const Padding = styled.div`
  width: 100%;
  height: 8px;
`

const SendMessageForm = styled.form`
  border-top: 1px solid ${themeValues.backgroundModifierAccent};
  flex-shrink: 0;
  margin-left: 20px;
  margin-right: 20px;
  flex: 0 0 auto;
`

const ChannelTextArea = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
  position: relative;
  width: 100%;
  transition: opacity 0.2s ease;
`

const ChannelTextInner = styled.div`
  display: flex;
  position: relative;
`

const TextArea = styled.div`
  background-color: transparent;
  border: none;
  font-weight: ${fontWeights.normal};
  font-size: 1rem;
  line-height: 1.375rem;
  width: 100%;
  color: ${themeValues.textNormal};
`

const TextInput = styled.input`
  background-color: ${themeValues.channelTextAreaBackground};
  border: 0;
  border-radius: 4px;
  width: 100%;
  padding: 10px;
  color: ${themeValues.textNormal};

  &::placeholder {
    color: ${themeValues.textMuted};
    font-weight: ${fontWeights.normal};
  }
`

class MessageWindow extends React.Component<IMessageWindowProps, {}> {
  private scrollRef = React.createRef<Scrollbars>()

  componentDidMount() {
    this.scrollRef.current!.scrollToBottom()
  }

  componentDidUpdate() {
    this.scrollRef.current!.scrollToBottom()
  }

  onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
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
        <SendMessageForm onSubmit={this.onFormSubmit}>
          <ChannelTextArea>
            <ChannelTextInner>
              <TextArea>
                <TextInput type="text" placeholder="Send a message" />
              </TextArea>
            </ChannelTextInner>
          </ChannelTextArea>
        </SendMessageForm>
      </Chat>
    )
  }
}

export default MessageWindow
