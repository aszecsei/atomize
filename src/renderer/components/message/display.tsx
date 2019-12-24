import * as React from 'react'
import Linkify from 'react-linkify'
import styled from '@emotion/styled'
import moment from 'moment'
import { shell } from 'electron'
import getUrls from 'get-urls'
import isImage from 'is-image'

import { fontWeights, themeValues } from '../../theme'
import { IMessage, MessageType } from '../../store/connections/types'
import YouTube from 'react-youtube'
import { toArray } from 'react-emoji-render'

const open = (event: any) => {
  event.preventDefault()
  shell.openItem(event.target.href as string)
}

const linkAndEmojiProcess = (str: string, svg?: boolean) => {
  const size = svg ? '' : '72x72'
  const ext = svg ? 'svg' : 'png'
  const emojisArray = toArray(str, {
    protocol: 'http',
    baseUrl: `//twemoji.maxcdn.com/2/${svg ? 'svg/' : ''}`,
    size,
    ext,
  })
  const newValues = emojisArray.map((n, idx) => {
    if (typeof n === 'string') {
      return (
        <Linkify
          key={idx}
          componentDecorator={(decoratedHref, decoratedText, key: number) => (
            <ChatLink href={decoratedHref} key={key} onClick={open}>
              {decoratedText}
            </ChatLink>
          )}
        >
          {n}
        </Linkify>
      )
    } else {
      return <React.Fragment key={idx}>{n}</React.Fragment>
    }
  })
  return <>{newValues}</>
}

const imageProcess = (str: string) => {
  const urls = getUrls(str)
  const imgUrls = [...urls].filter(url => {
    if (isImage(url)) {
      return true
    }
    // TODO: Request the image and use the content-type to check whether the result is an image
    return false
  })
  return (
    <>
      {imgUrls.map((url, idx) => (
        <ChatImage src={url} key={idx} onClick={() => shell.openItem(url)} />
      ))}
    </>
  )
}

const youtubeProcess = (str: string) => {
  const urls = getUrls(str)
  const yturlre1 = /(https?:\/\/)?(www\.)?((youtu.be\/([^?]+))|(youtube.com\/embed\/([^?]+))|(youtube.com\/watch\?(.+&)?(v=([^&]+))))/i
  const ytUrls = [...urls].filter(url => {
    return yturlre1.exec(url)
  })
  return (
    <>
      {ytUrls.map((url, idx) => {
        const reres = yturlre1.exec(url)
        let videoId = reres![5] || reres![7] || reres![11]
        return (
          <ChatYoutube key={idx}>
            <YouTube videoId={videoId} />
          </ChatYoutube>
        )
      })}
    </>
  )
}

interface IChatContainerProps {
  isMe?: boolean
}

const ChatYoutube = styled.div`
  padding: 10px;
  max-width: 100%;
  max-height: auto;
  cursor: pointer;
`

const ChatLink = styled.a`
  color: ${themeValues.textLink};
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`

const ChatImage = styled.img`
  padding: 10px;
  max-width: 100%;
  max-height: auto;
  cursor: pointer;
`

const ChatContainer = styled.div<IChatContainerProps>`
  overflow: hidden;
  padding: ${themeValues.messagePadding};
  border-bottom: 1px solid ${themeValues.backgroundModifierAccent};
  background-color: ${props =>
    props.isMe ? themeValues.backgroundModifierHover : null};
  &:last-child {
    border-bottom: 0;
  }

  box-sizing: border-box;
  word-wrap: break-word;
  user-select: text;
  flex: 0 0 auto;
`

const ChatHeader = styled.div`
  display: flex;
  align-items: flex-start;
  align-content: normal;
`

const ChatH2 = styled.h2`
  white-space: nowrap;
  color: ${themeValues.textMuted};
  margin: 0;
`

const ChatUserName = styled.span`
  font-weight: ${fontWeights.normal};
  color: ${themeValues.headerPrimary};
  font-size: 1rem;
  line-height: 1.375em;
  cursor: pointer;
`

const ChatTimestamp = styled.time`
  font-size: 0.75rem;
  font-weight: ${fontWeights.normal};
  color: ${themeValues.textMuted};
  margin-left: 0.3rem;
  cursor: text;
`

const ChatContent = styled.div`
  padding-right: 10px;
  font-size: 1rem;
  line-height: 1.375;
  white-space: pre-wrap;
  word-wrap: break-word;
  user-select: text;
  color: ${themeValues.textNormal};
  font-weight: ${fontWeights.normal};
  cursor: text;
`

interface IMessageProps {
  message: IMessage
}

const Message = (props: IMessageProps) => (
  <ChatContainer isMe={props.message.isMe}>
    <ChatHeader>
      <ChatH2>
        <ChatUserName>{props.message.sender}</ChatUserName>
        <ChatTimestamp>{moment(props.message.sent).calendar()}</ChatTimestamp>
      </ChatH2>
    </ChatHeader>
    <ChatContent>
      {linkAndEmojiProcess(props.message.text)}
      {imageProcess(props.message.text)}
      {youtubeProcess(props.message.text)}
    </ChatContent>
  </ChatContainer>
)

export default Message
