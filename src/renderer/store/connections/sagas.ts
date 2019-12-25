import {
  CONNECT_TO_SERVER,
  ConnectionStatus,
  IConnectToServerAction,
  IChannel,
  IDisconnectFromServerAction,
  DISCONNECT_FROM_SERVER,
  REMOVE_SERVER,
  IRemoveServerAction,
  IJoinChannelAction,
  JOIN_CHANNEL,
  IPartChannelAction,
  IRemoveChannelAction,
  PART_CHANNEL,
  REMOVE_CHANNEL,
  parseKickMessage,
  parseKillMessage,
  parsePartMessage,
  parseQuitMessage,
  parseJoinMessage,
  IForcedJoinChannelAction,
  FORCED_JOIN_CHANNEL,
  parseNoticeMessage,
  parseMessage,
  parseNickChange,
  ISendMessageAction,
  SEND_MESSAGE,
} from './types'
import {
  all,
  call,
  fork,
  put,
  select,
  spawn,
  take,
  cancel,
} from 'redux-saga/effects'
import { getSettings } from '../'
import * as irc from 'irc'
import { ISettingsState } from '../settings/types'
import { getServer, getChannel, getChannelByName } from '../'
import { eventChannel, END, Task } from 'redux-saga'
import {
  markServerStatus,
  markChannelStatus,
  receiveMessage,
  addChannel,
  forcedJoinChannel,
} from './actions'

function* subscribeToKick(
  client: irc.Client,
  serverId: string,
  channelId: string
) {
  let channel = getChannel(yield select(), serverId, channelId) as IChannel
  const evChan = eventChannel(emit => {
    const handler = (
      ichannel: string,
      nick: string,
      by: string,
      reason: string,
      _message: irc.IMessage
    ) => {
      if (ichannel === channel.name) {
        emit(
          receiveMessage(
            parseKickMessage(
              nick,
              by,
              channel.name,
              reason,
              new Date(),
              nick === client.nick || by === client.nick
            ),
            serverId,
            channelId
          )
        )
      }
    }
    client.addListener('kick', handler)
    return () => {
      client.removeListener('kick', handler)
    }
  })

  for (;;) {
    const action = yield take(evChan)
    yield put(action)
  }
}
function* subscribeToPart(
  client: irc.Client,
  serverId: string,
  channelId: string
) {
  let channel = getChannel(yield select(), serverId, channelId) as IChannel
  const evChan = eventChannel(emit => {
    const handler = (
      ichannel: string,
      nick: string,
      reason: string,
      _message: irc.IMessage
    ) => {
      if (ichannel === channel.name) {
        emit(
          receiveMessage(
            parsePartMessage(
              nick,
              channel.name,
              reason,
              new Date(),
              nick === client.nick
            ),
            serverId,
            channelId
          )
        )
      }
    }
    client.addListener('part', handler)
    return () => {
      client.removeListener('part', handler)
    }
  })

  for (;;) {
    const action = yield take(evChan)
    yield put(action)
  }
}
function* subscribeToKill(
  client: irc.Client,
  serverId: string,
  channelId: string
) {
  let channel = getChannel(yield select(), serverId, channelId) as IChannel
  const evChan = eventChannel(emit => {
    const handler = (
      nick: string,
      reason: string,
      channels: string[],
      _message: irc.IMessage
    ) => {
      if (channels.includes(channel.name) || channel.name === '#') {
        emit(
          receiveMessage(
            parseKillMessage(nick, reason, new Date(), nick === client.nick),
            serverId,
            channelId
          )
        )
      }
    }
    client.addListener('kill', handler)
    return () => {
      client.removeListener('kill', handler)
    }
  })

  for (;;) {
    const action = yield take(evChan)
    yield put(action)
  }
}
function* subscribeToQuit(
  client: irc.Client,
  serverId: string,
  channelId: string
) {
  let channel = getChannel(yield select(), serverId, channelId) as IChannel
  const evChan = eventChannel(emit => {
    const handler = (
      nick: string,
      reason: string,
      channels: string[],
      _message: irc.IMessage
    ) => {
      if (channels.includes(channel.name) || channel.name === '#') {
        emit(
          receiveMessage(
            parseQuitMessage(nick, reason, new Date(), nick === client.nick),
            serverId,
            channelId
          )
        )
      }
    }
    client.addListener('quit', handler)
    return () => {
      client.removeListener('quit', handler)
    }
  })

  for (;;) {
    const action = yield take(evChan)
    yield put(action)
  }
}
function* subscribeToJoin(
  client: irc.Client,
  serverId: string,
  channelId: string
) {
  let channel = getChannel(yield select(), serverId, channelId) as IChannel
  const evChan = eventChannel(emit => {
    const handler = (
      ichannel: string,
      nick: string,
      _message: irc.IMessage
    ) => {
      if (nick === client.nick && channel.name === '#') {
        // We were possibly forced to join a channel
        emit(forcedJoinChannel(serverId, ichannel))
      } else if (ichannel === channel.name) {
        emit(
          receiveMessage(
            parseJoinMessage(
              nick,
              channel.name,
              new Date(),
              nick === client.nick
            ),
            serverId,
            channelId
          )
        )
      }
    }
    client.addListener('join', handler)
    return () => {
      client.removeListener('join', handler)
    }
  })

  for (;;) {
    const action = yield take(evChan)
    // First, check our forced-join actions: if the channel already exists, we just got notified that we joined it.
    if (action.type === FORCED_JOIN_CHANNEL) {
      let chan = getChannelByName(yield select(), serverId, action.channel)
      if (chan) {
        // The channel already exists, we just got notified that we joined it
        yield put(
          markChannelStatus(serverId, chan.id, ConnectionStatus.Connected)
        )
        continue
      }
    }
    yield put(action)
  }
}
function* subscribeToNotice(
  client: irc.Client,
  serverId: string,
  channelId: string
) {
  let channel = getChannel(yield select(), serverId, channelId) as IChannel
  const evChan = eventChannel(emit => {
    const handler = (
      nick: string,
      to: string,
      text: string,
      message: irc.IMessage
    ) => {
      if (to === channel.name || (to[0] !== '#' && '#' === channel.name)) {
        const sender = nick ? nick : (message as any).server // the typings don't include the server parameter for some reason
        emit(
          receiveMessage(
            parseNoticeMessage(
              sender,
              to,
              message.args[1],
              nick === client.nick
            ),
            serverId,
            channelId
          )
        )
      }
    }
    client.addListener('notice', handler)
    return () => {
      client.removeListener('notice', handler)
    }
  })

  for (;;) {
    const action = yield take(evChan)
    yield put(action)
  }
}
function* subscribeToChannelMessage(
  client: irc.Client,
  serverId: string,
  channelId: string
) {
  let channel = getChannel(yield select(), serverId, channelId) as IChannel
  const evChan = eventChannel(emit => {
    const handler = (nick: string, text: string, _message: irc.IMessage) => {
      emit(
        receiveMessage(
          parseMessage(
            nick,
            channel.name,
            text,
            new Date(),
            nick === client.nick
          ),
          serverId,
          channelId
        )
      )
    }
    client.addListener(`message${channel.name}`, handler)
    return () => {
      client.removeListener(`message${channel.name}`, handler)
    }
  })

  for (;;) {
    const action = yield take(evChan)
    yield put(action)
  }
}
function* subscribeToNick(
  client: irc.Client,
  serverId: string,
  channelId: string
) {
  let channel = getChannel(yield select(), serverId, channelId) as IChannel
  const evChan = eventChannel(emit => {
    const handler = (
      oldnick: string,
      newnick: string,
      channels: string[],
      _message: irc.IMessage
    ) => {
      if (
        channels.includes(channel.name) ||
        (channel.name === '#' && newnick === client.nick)
      ) {
        emit(
          receiveMessage(
            parseNickChange(
              oldnick,
              newnick,
              channels,
              new Date(),
              newnick === client.nick
            ),
            serverId,
            channelId
          )
        )
      }
    }
    client.addListener('nick', handler)
    return () => {
      client.removeListener('nick', handler)
    }
  })

  for (;;) {
    const action = yield take(evChan)
    yield put(action)
  }
}

// Responsible for reading messages. Basically just subscribes to a bunch of events in parallel.
function* read(client: irc.Client, serverId: string, channelId: string) {
  yield all([
    fork(subscribeToKick, client, serverId, channelId),
    fork(subscribeToPart, client, serverId, channelId),
    fork(subscribeToKill, client, serverId, channelId),
    fork(subscribeToQuit, client, serverId, channelId),
    fork(subscribeToJoin, client, serverId, channelId),
    fork(subscribeToNotice, client, serverId, channelId),
    fork(subscribeToChannelMessage, client, serverId, channelId),
    fork(subscribeToNick, client, serverId, channelId),
  ])
}

// Responsible for sending messages.
function* write(client: irc.Client, serverId: string, channelId: string) {
  let channel = getChannel(yield select(), serverId, channelId) as IChannel
  for (;;) {
    const payload: ISendMessageAction = yield take(SEND_MESSAGE)
    if (payload.serverId === serverId && payload.channelId === channelId) {
      // TODO: Intercept all /command messages
      if (channel.name === '#') {
        client.send(payload.message)
      } else {
        client.say(channel.name, payload.message)
      }
      yield put(
        receiveMessage(
          parseMessage(
            client.nick,
            channel.name,
            payload.message,
            new Date(),
            true
          ),
          serverId,
          channelId
        )
      )
    }
  }
}

// Responsible for the lifetime of a channel. Spawns tasks to assist with read/write actions. It requires a channel to have already been added to the store;
// all we handle is the IRC client.
function* handleChannel(
  client: irc.Client,
  serverId: string,
  channelId: string
) {
  // Spawn a channel-read and channel-write task
  let readTask: Task = yield fork(read, client, serverId, channelId)
  let writeTask: Task = yield fork(write, client, serverId, channelId)
  for (;;) {
    // Wait until we get told to leave the channel
    const payload: IPartChannelAction | IRemoveChannelAction = yield take([
      PART_CHANNEL,
      REMOVE_CHANNEL,
    ])
    // Check if the part request actually belongs to us
    if (payload.serverId === serverId && payload.channelId === channelId) {
      // It does - cancel our read/write tasks
      yield all([cancel(readTask), cancel(writeTask)])

      // Tell the IRC client to leave the channel
      let settings = getSettings(yield select())
      let channel = getChannel(yield select(), serverId, channelId)
      client.part(channel?.name as string, settings.defleave, () => {})

      // If we're parting, set the channel status
      if (payload.type === PART_CHANNEL) {
        yield put(
          markChannelStatus(serverId, channelId, ConnectionStatus.NotConnected)
        )
      }

      // Exit the loop
      break
    }
  }
}

// Task to handle joining new channels. Requires the channel to already exist in the store;
// all we handle is the IRC client.
function* handleJoinChannels(client: irc.Client, serverId: string) {
  for (;;) {
    const payload: IJoinChannelAction = yield take(JOIN_CHANNEL)
    // Make sure we have the right server
    if (payload.serverId === serverId) {
      const channel = getChannel(yield select(), serverId, payload.channelId)
      // Make sure the channel exists
      if (channel) {
        // Make sure we haven't already joined the channel
        if (!channel.connected) {
          const evChannel = eventChannel(emit => {
            console.log('Connecting...')
            client.join(channel.name, () => {
              emit(
                markChannelStatus(
                  payload.serverId,
                  payload.channelId,
                  ConnectionStatus.Connecting
                )
              )
              emit(END)
            })
            return () => {}
          })
          const action = yield take(evChannel)
          yield put(action)
        }
      } else {
        throw new Error(
          'JOIN_CHANNEL called with server or channel that does not exist!'
        )
      }
    }
  }
}

function* handleForcedJoinChannels(client: irc.Client, serverId: string) {
  for (;;) {
    const payload: IForcedJoinChannelAction = yield take(FORCED_JOIN_CHANNEL)
    // Make sure we have the right server
    if (payload.serverId === serverId) {
      // Create the channel
      yield put(addChannel(serverId, payload.channel))
      // Get the channel
      const channel = getChannelByName(
        yield select(),
        serverId,
        payload.channel
      )
      // Make sure the channel exists - it should!
      if (channel) {
        // We've already been joined to the channel
        yield put(
          markChannelStatus(
            payload.serverId,
            channel.id,
            ConnectionStatus.Connected
          )
        )
        // Start a channel listener
        yield fork(handleChannel, client, serverId, channel.id)
      } else {
        throw new Error('FORCED_JOIN_CHANNEL could not create channel!')
      }
    }
  }
}

// Utility function to create an IRC client.
function createClient(
  url: string,
  nickname: string,
  channels: string[],
  settings: ISettingsState
) {
  return new irc.Client(url, nickname, {
    userName: settings.userName,
    realName: settings.realName,
    channels,
    debug: process.env.NODE_ENV !== 'production',
    autoConnect: false,
    encoding: 'utf-8',
  })
}

// Tell our IRC client to connect. If the connection  is successful, we mark the server as connected; otherwise, mark it as disconnected.
function* connectClient(serverId: string, client: irc.Client) {
  const evChannel = eventChannel(emit => {
    console.log('Connecting...')

    let errorListener = (message: any) => {
      console.error(message)
      emit(markServerStatus(serverId, ConnectionStatus.NotConnected))
      emit(END)
    }
    client.once('error', errorListener)
    client.connect(() => {
      console.log('Connected!')
      client.removeListener('error', errorListener)
      emit(markServerStatus(serverId, ConnectionStatus.Connected))
      emit(END)
    })
    return () => {}
  })
  for (;;) {
    const action = yield take(evChannel)
    yield put(action)
  }
}

// Responsible for handling a server connection. It requires the server to have already been added to the store; all we do is set up the connection.
function* handleServer(payload: IConnectToServerAction) {
  let settings = getSettings(yield select())
  let serverData = getServer(yield select(), payload.serverId)

  if (serverData) {
    // Create the IRC client
    let client = createClient(
      serverData.url,
      serverData.nickname,
      serverData.defaultChannels,
      settings
    )
    // Connect the IRC client. This will either mark the server as connected or disconnected.
    yield call(connectClient, serverData.id, client)
    // Refresh the server data; we want to do this so that we can check if the connection was successful.
    serverData = getServer(yield select(), payload.serverId)
    if (serverData?.connected) {
      // Now we need to handle the different channels.
      let channelTasks: Task[] = yield all(
        serverData?.channels.map(c => {
          return fork(handleChannel, client, serverData?.id as string, c.id)
        })
      )

      // And handle any added channels
      let joinTask: Task = yield fork(
        handleJoinChannels,
        client,
        serverData?.id as string
      )
      let forcedJoinTask: Task = yield fork(
        handleForcedJoinChannels,
        client,
        serverData?.id as string
      )

      // Wait until we disconnect the client or remove the server
      for (;;) {
        const action:
          | IDisconnectFromServerAction
          | IRemoveServerAction = yield take([
          REMOVE_SERVER,
          DISCONNECT_FROM_SERVER,
        ])
        // Check if the disconnect/remove request belongs to us
        if (action.serverId === serverData.id) {
          // Cancel channel listeners - this also cancels all of their forked tasks
          yield all([
            ...channelTasks.map(t => {
              return cancel(t)
            }),
            cancel(joinTask),
            cancel(forcedJoinTask),
          ])

          // Send our 'quit' message & disconnect
          settings = getSettings(yield select())
          client.disconnect(settings.defquit, () => {})

          // If we're disconnecting, mark the server as disconnected
          if (action.type === DISCONNECT_FROM_SERVER) {
            yield put(
              markServerStatus(action.serverId, ConnectionStatus.NotConnected)
            )

            // Also mark all the channels as disconnected!
            serverData = getServer(yield select(), payload.serverId)
            yield all(
              serverData!.channels.map(c =>
                put(
                  markChannelStatus(
                    action.serverId,
                    c.id,
                    ConnectionStatus.NotConnected
                  )
                )
              )
            )
          }

          // Exit the loop
          break
        }
      }
    }
  } else {
    throw new Error('CONNECT_TO_SERVER called with server that does not exist!')
  }
}

// This is the root saga for all connections. It spins, waits for a new server connection to be requested, and then
// spawns a new "thread" to handle that connection.
export function* connectionsSaga() {
  for (;;) {
    const payload = yield take(CONNECT_TO_SERVER)
    yield put(markServerStatus(payload.serverId, ConnectionStatus.Connecting))
    yield spawn(handleServer, payload)
  }
}
