import { v4 as uuid } from 'uuid'

export enum ConnectionStatus {
  NotConnected,
  Connecting,
  Connected,
}

export enum MessageType {
  MESSAGE,
  NICKCHANGE,
  SERVER,
  NOTICE,
  JOIN,
  QUIT,
  PART,
  KICK,
  KILL,
}

export interface IMessage {
  readonly id: string
  readonly type: MessageType
  readonly text: string
  readonly sender: string
  readonly sent: Date
  readonly isMe: boolean
}

function makeMessage(val: Partial<IMessage>): IMessage {
  const def: IMessage = {
    id: uuid(),
    type: MessageType.MESSAGE,
    text: '',
    sender: '',
    sent: new Date(),
    isMe: false,
  }
  return {
    ...def,
    ...val,
  }
}

export function parseKillMessage(
  nick: string,
  reason?: string,
  sent: Date = new Date(),
  isMe = false
): IMessage {
  const str =
    reason && reason !== ''
      ? `${nick} has been killed (${reason})`
      : `${nick} has been killed`
  return makeMessage({
    type: MessageType.KILL,
    text: str,
    sent,
    isMe,
  })
}

export function parseKickMessage(
  nick: string,
  by: string,
  channel: string,
  reason?: string,
  sent: Date = new Date(),
  isMe = false
): IMessage {
  const str =
    reason && reason !== ''
      ? `${by} kicked ${nick} (reason: ${reason})`
      : `${by} kicked ${nick}`
  return makeMessage({
    type: MessageType.KICK,
    text: str,
    sent,
    isMe,
  })
}

export function parsePartMessage(
  nick: string,
  channel: string,
  reason?: string,
  sent: Date = new Date(),
  isMe = false
): IMessage {
  const str =
    reason && reason !== ''
      ? `${nick} has left ${channel} (reason: ${reason})`
      : `${nick} has left ${channel}`
  return makeMessage({
    type: MessageType.PART,
    text: str,
    sent,
    isMe,
  })
}

export function parseJoinMessage(
  nick: string,
  channel: string,
  sent: Date = new Date(),
  isMe = false
): IMessage {
  const str = `${nick} has joined ${channel}`
  return makeMessage({
    type: MessageType.JOIN,
    text: str,
    sent,
    isMe,
  })
}

export function parseQuitMessage(
  nick: string,
  reason?: string,
  sent: Date = new Date(),
  isMe = false
): IMessage {
  const str =
    reason && reason !== ''
      ? `${nick} has quit (reason: ${reason})`
      : `${nick} has quit`
  return makeMessage({
    type: MessageType.QUIT,
    text: str,
    sent,
    isMe,
  })
}

export function parseNoticeMessage(
  from: string,
  to: string,
  message: string,
  isMe = false
): IMessage {
  const sender = `(${from} notice to ${to})`
  return makeMessage({
    type: MessageType.NOTICE,
    text: message,
    sender,
    isMe,
  })
}

export function parseMessage(
  nick: string,
  to: string,
  text: string,
  sent: Date = new Date(),
  isMe = false
): IMessage {
  return makeMessage({
    type: MessageType.MESSAGE,
    text,
    sender: nick,
    sent,
    isMe,
  })
}

export function parseNickChange(
  oldnick: string,
  newnick: string,
  channels: string[],
  sent: Date = new Date(),
  isMe = false
): IMessage {
  return makeMessage({
    type: MessageType.NICKCHANGE,
    text: `${oldnick} is now known as ${newnick}`,
    sent,
    isMe,
  })
}

export interface IChannel {
  readonly id: string
  readonly serverId: string
  readonly name: string
  readonly log: IMessage[]
  readonly connected: ConnectionStatus
  readonly isUnread: boolean
}

export interface IServer {
  readonly id: string
  readonly name: string
  readonly url: string
  readonly nickname: string
  readonly defaultChannels: string[]
  readonly channels: IChannel[]
  readonly log: IMessage[]
  readonly connected: ConnectionStatus
}

export interface IConnectionsState {
  readonly servers: IServer[]
  readonly selectedServerId?: string
  readonly selectedChannelId?: string
}

// ACTIONS

export const ADD_SERVER = 'ADD_SERVER' // Add a server to the stored server list. Does not necessarily connect to that server!
export const REMOVE_SERVER = 'REMOVE_SERVER' // Remove a server from the stored server list. Disconnects from the server first, if necessary.
export const CONNECT_TO_SERVER = 'CONNECT_TO_SERVER' // Connect to a server.
export const DISCONNECT_FROM_SERVER = 'DISCONNECT_FROM_SERVER' // Disconnect from a server. Does not remove that server from the stored server list!
export const MARK_SERVER_STATUS = 'MARK_SERVER_STATUS' // Mark a server as being either connected or disconnected
export const SELECT_SERVER = 'SELECT_SERVER' // Selects a server to view & send messages to the server log

export const ADD_CHANNEL = 'ADD_CHANNEL' // Add a channel to the stored channel list. Does not necessarily join that channel!
export const REMOVE_CHANNEL = 'REMOVE_CHANNEL' // Remove a channel from the stored channel list. Parts that channel first, if necessary.
export const JOIN_CHANNEL = 'JOIN_CHANNEL' // Joins a channel.
export const PART_CHANNEL = 'PART_CHANNEL' // Parts from a channel. Does not remove that channel from the stored channel list!
export const MARK_CHANNEL_STATUS = 'MARK_CHANNEL_STATUS' // Mark a channel as being joined or not
export const SELECT_CHANNEL = 'SELECT_CHANNEL' // Selects a channel to view & send messages to that channel
export const FORCED_JOIN_CHANNEL = 'FORCED_JOIN_CHANNEL' // Occurs when the user is forcibly joined to a channel

export const SEND_MESSAGE = 'SEND_MESSAGE' // Send a message to the active channel or server
export const RECEIVE_MESSAGE = 'RECEIVE_MESSAGE' // Receives a message from a server or channel

export interface IAddServerAction {
  type: typeof ADD_SERVER
  name: string
  url: string
  nickname: string
  channels: string[]
}

export interface IRemoveServerAction {
  type: typeof REMOVE_SERVER
  serverId: string
}

export interface IConnectToServerAction {
  type: typeof CONNECT_TO_SERVER
  serverId: string
}

export interface IDisconnectFromServerAction {
  type: typeof DISCONNECT_FROM_SERVER
  serverId: string
}

export interface IMarkServerStatusAction {
  type: typeof MARK_SERVER_STATUS
  serverId: string
  connected: ConnectionStatus
}

export interface ISelectServerAction {
  type: typeof SELECT_SERVER
  serverId: string
}

export interface IAddChannelAction {
  type: typeof ADD_CHANNEL
  serverId: string
  channel: string
}

export interface IRemoveChannelAction {
  type: typeof REMOVE_CHANNEL
  serverId: string
  channelId: string
}

export interface IJoinChannelAction {
  type: typeof JOIN_CHANNEL
  serverId: string
  channelId: string
}

export interface IPartChannelAction {
  type: typeof PART_CHANNEL
  serverId: string
  channelId: string
}

export interface IMarkChannelStatusAction {
  type: typeof MARK_CHANNEL_STATUS
  serverId: string
  channelId: string
  connected: ConnectionStatus
}

export interface ISelectChannelAction {
  type: typeof SELECT_CHANNEL
  serverId: string
  channelId: string
}

export interface IForcedJoinChannelAction {
  type: typeof FORCED_JOIN_CHANNEL
  serverId: string
  channel: string
}

export interface ISendMessageAction {
  type: typeof SEND_MESSAGE
  serverId: string
  channelId: string
  message: string
}

export interface IReceiveMessageAction {
  type: typeof RECEIVE_MESSAGE
  serverId: string
  channelId?: string
  message: IMessage
}

export type ConnectionsActionTypes =
  | IAddServerAction
  | IRemoveServerAction
  | IConnectToServerAction
  | IDisconnectFromServerAction
  | IMarkServerStatusAction
  | ISelectServerAction
  | IAddChannelAction
  | IRemoveChannelAction
  | IJoinChannelAction
  | IPartChannelAction
  | IMarkChannelStatusAction
  | ISelectChannelAction
  | IForcedJoinChannelAction
  | ISendMessageAction
  | IReceiveMessageAction
