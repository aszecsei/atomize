import {
  IConnectionsState,
  ConnectionsActionTypes,
  REMOVE_SERVER,
  SELECT_SERVER,
  ADD_CHANNEL,
  ADD_SERVER,
  REMOVE_CHANNEL,
  SELECT_CHANNEL,
  RECEIVE_MESSAGE,
  MARK_SERVER_STATUS,
  MARK_CHANNEL_STATUS,
} from './types'
import produce from 'immer'
import { v4 as uuid } from 'uuid'
import { createSelector } from 'reselect'

const initialState: IConnectionsState = {
  servers: [],
  selectedChannelId: undefined,
  selectedServerId: undefined,
}

function connectionsReducer(
  state = initialState,
  action: ConnectionsActionTypes
): IConnectionsState {
  switch (action.type) {
    // SERVER CONTROL
    case ADD_SERVER:
      return produce(state, draft => {
        draft.servers.push({
          id: uuid(),
          name: action.name,
          url: action.url,
          nickname: action.nickname,
          defaultChannels: action.channels,
          channels: [
            {
              id: uuid(),
              name: '#',
              log: [],
              connected: false,
              isUnread: false,
            },
            ...action.channels.map(c => ({
              id: uuid(),
              name: c,
              log: [],
              connected: false,
              isUnread: false,
            })),
          ],
          log: [],
          connected: false,
        })
      })
    case REMOVE_SERVER:
      return produce(state, draft => {
        draft.servers = draft.servers.filter(s => s.id !== action.serverId)
      })
    case MARK_SERVER_STATUS:
      return produce(state, draft => {
        let s = draft.servers.find(s => s.id === action.serverId)
        if (s !== undefined) {
          s.connected = action.connected
        }
      })
    case SELECT_SERVER:
      return produce(state, draft => {
        draft.selectedServerId = action.serverId
        draft.selectedChannelId = undefined
      })

    // CHANNEL CONTROL
    case ADD_CHANNEL:
      return produce(state, draft => {
        draft.servers
          .find(s => s.id === action.serverId)
          ?.channels.push({
            id: uuid(),
            name: action.channel,
            log: [],
            connected: false,
            isUnread: false,
          })
      })
    case REMOVE_CHANNEL:
      return produce(state, draft => {
        let server = draft.servers.find(s => s.id === action.serverId)
        if (server !== undefined) {
          server.channels = server.channels.filter(
            c => c.id !== action.channelId
          )
        }
      })
    case MARK_CHANNEL_STATUS:
      return produce(state, draft => {
        let c = draft.servers
          .find(s => s.id === action.serverId)
          ?.channels.find(c => c.id === action.channelId)
        if (c !== undefined) {
          c.connected = action.connected
        }
      })
    case SELECT_CHANNEL:
      return produce(state, draft => {
        draft.selectedServerId = action.serverId
        draft.selectedChannelId = action.channelId
        if (action.serverId !== undefined && action.channelId !== undefined) {
          let c = draft.servers
            .find(s => s.id === action.serverId)
            ?.channels.find(c => c.id === action.channelId)
          if (c !== undefined) {
            c.isUnread = false
          }
        }
      })

    // MESSAGE CONTROL
    case RECEIVE_MESSAGE:
      return produce(state, draft => {
        let server = draft.servers.find(s => s.id === action.serverId)
        if (server !== undefined) {
          if (action.channelId === undefined) {
            server.log.push(action.message)
          } else {
            let channel = server.channels.find(c => c.id === action.channelId)
            if (channel !== undefined) {
              channel.log.push(action.message)
            }
          }
        }
      })

    default:
      return state
  }
}
export default connectionsReducer

export const getSelectedServerId = (state: IConnectionsState) =>
  state.selectedServerId
export const getSelectedChannelId = (state: IConnectionsState) =>
  state.selectedChannelId
export const getServers = (state: IConnectionsState) => state.servers

export const getSelectedServer = createSelector(
  getServers,
  getSelectedServerId,
  (servers, selectedServerId) => servers.find(s => s.id === selectedServerId)
)

export const getSelectedChannel = createSelector(
  getSelectedServer,
  getSelectedChannelId,
  (server, selectedChannelId) =>
    server?.channels.find(c => c.id === selectedChannelId)
)

export const getServer = (state: IConnectionsState, serverId: string) =>
  state.servers.find(s => s.id === serverId)

export const getChannel = (
  state: IConnectionsState,
  serverId: string,
  channelId: string
) =>
  state.servers
    .find(s => s.id === serverId)
    ?.channels.find(c => c.id === channelId)

export const getChannelByName = (
  state: IConnectionsState,
  serverId: string,
  channel: string
) =>
  state.servers
    .find(s => s.id === serverId)
    ?.channels.find(c => c.name === channel)
