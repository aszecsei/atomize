import {
  IMessage,
  ConnectionsActionTypes,
  ConnectionStatus,
  ADD_SERVER,
  REMOVE_SERVER,
  CONNECT_TO_SERVER,
  DISCONNECT_FROM_SERVER,
  SELECT_SERVER,
  ADD_CHANNEL,
  REMOVE_CHANNEL,
  JOIN_CHANNEL,
  PART_CHANNEL,
  SELECT_CHANNEL,
  SEND_MESSAGE,
  RECEIVE_MESSAGE,
  MARK_SERVER_STATUS,
  MARK_CHANNEL_STATUS,
  FORCED_JOIN_CHANNEL,
} from './types'

export function addServer(
  name: string,
  url: string,
  nickname: string,
  channels: string[]
): ConnectionsActionTypes {
  return {
    type: ADD_SERVER,
    name,
    url,
    nickname,
    channels,
  }
}

export function removeServer(serverId: string): ConnectionsActionTypes {
  return {
    type: REMOVE_SERVER,
    serverId,
  }
}

export function connectToServer(serverId: string): ConnectionsActionTypes {
  return {
    type: CONNECT_TO_SERVER,
    serverId,
  }
}

export function disconnectFromServer(serverId: string): ConnectionsActionTypes {
  return {
    type: DISCONNECT_FROM_SERVER,
    serverId,
  }
}

export function markServerStatus(
  serverId: string,
  connected: ConnectionStatus
): ConnectionsActionTypes {
  return {
    type: MARK_SERVER_STATUS,
    serverId,
    connected,
  }
}

export function selectServer(serverId: string): ConnectionsActionTypes {
  return {
    type: SELECT_SERVER,
    serverId,
  }
}

export function addChannel(
  serverId: string,
  channel: string
): ConnectionsActionTypes {
  return {
    type: ADD_CHANNEL,
    serverId,
    channel,
  }
}

export function removeChannel(
  serverId: string,
  channelId: string
): ConnectionsActionTypes {
  return {
    type: REMOVE_CHANNEL,
    serverId,
    channelId,
  }
}

export function joinChannel(
  serverId: string,
  channelId: string
): ConnectionsActionTypes {
  return {
    type: JOIN_CHANNEL,
    serverId,
    channelId,
  }
}

export function partChannel(
  serverId: string,
  channelId: string
): ConnectionsActionTypes {
  return {
    type: PART_CHANNEL,
    serverId,
    channelId,
  }
}

export function markChannelStatus(
  serverId: string,
  channelId: string,
  connected: ConnectionStatus
): ConnectionsActionTypes {
  return {
    type: MARK_CHANNEL_STATUS,
    serverId,
    channelId,
    connected,
  }
}

export function selectChannel(
  serverId: string,
  channelId: string
): ConnectionsActionTypes {
  return {
    type: SELECT_CHANNEL,
    serverId,
    channelId,
  }
}

export function forcedJoinChannel(
  serverId: string,
  channel: string
): ConnectionsActionTypes {
  return {
    type: FORCED_JOIN_CHANNEL,
    serverId,
    channel,
  }
}

export function sendMessage(
  serverId: string,
  channelId: string,
  message: string
): ConnectionsActionTypes {
  return {
    type: SEND_MESSAGE,
    serverId,
    channelId,
    message,
  }
}

export function receiveMessage(
  message: IMessage,
  serverId: string,
  channelId?: string
): ConnectionsActionTypes {
  return {
    type: RECEIVE_MESSAGE,
    serverId,
    channelId,
    message,
  }
}
