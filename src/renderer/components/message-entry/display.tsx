import * as React from 'react'

import styled from '@emotion/styled'
import { themeValues, fontWeights } from '../../theme'
import { IChannel } from '../../store/connections/types'

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

interface IChatBoxProps {
  selectedChannel?: IChannel
  sendMessage: (serverId: string, channelId: string, message: string) => void
}

interface IChatBoxState {
  message: string
}

class ChatBox extends React.Component<IChatBoxProps, IChatBoxState> {
  state = {
    message: '',
  }

  onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (this.props.selectedChannel) {
      if (this.state.message !== '') {
        this.props.sendMessage(
          this.props.selectedChannel.serverId,
          this.props.selectedChannel.id,
          this.state.message
        )
      }
    }
    e.preventDefault()
  }

  render() {
    return (
      <SendMessageForm onSubmit={this.onFormSubmit}>
        <ChannelTextArea>
          <ChannelTextInner>
            <TextArea>
              <TextInput
                type="text"
                placeholder="Send a message"
                disabled={this.props.selectedChannel === undefined}
                value={this.state.message}
                onChange={e => {
                  this.setState({ message: e.target.value })
                }}
              />
            </TextArea>
          </ChannelTextInner>
        </ChannelTextArea>
      </SendMessageForm>
    )
  }
}

export default ChatBox
