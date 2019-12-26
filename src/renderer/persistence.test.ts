const sendMock = jest.fn()
const onceMock = jest.fn()
const v4Mock = jest.fn()
const dispatchMock = jest.fn()
const subscribeMock = jest.fn()
const getStateMock = jest.fn()

jest.mock('electron', () => ({
  ipcRenderer: {
    send: sendMock,
    once: onceMock,
  },
}))
jest.mock('uuid', () => ({
  v4: v4Mock,
}))
jest.mock('./store', () => ({
  dispatch: dispatchMock,
  subscribe: subscribeMock,
  getState: getStateMock,
}))

import { saveFile, readFile, hydrateSettings } from './persistence'
import {
  SAVE_FILE,
  SAVE_FILE_RESULT,
  READ_FILE,
  READ_FILE_RESULT,
} from '../common/ipc'

describe('persistence', () => {
  const uuidResult = '0fb3f05e-4b23-46f9-8075-8df13d89e18a'
  v4Mock.mockImplementation(() => uuidResult)

  describe('saveFile', () => {
    const filename = 'hello.txt'
    const data = { foo: 'bar' }

    it('sends a "save file" request to the ipcRenderer', async () => {
      onceMock.mockImplementationOnce((_, cb) => cb(null, { err: null }))
      await saveFile(filename, data)

      expect(sendMock).toBeCalledWith(SAVE_FILE, filename, data, uuidResult)
    })

    it('waits for a response from the ipcRenderer', async () => {
      onceMock.mockImplementationOnce((_, cb) => cb(null, { err: null }))
      await saveFile(filename, data)
      expect(onceMock).toBeCalled()
      expect(onceMock.mock.calls[onceMock.mock.calls.length - 1][0]).toBe(
        `${SAVE_FILE_RESULT}:${uuidResult}`
      )
    })

    it('throws an exception if the read failed', () => {
      let err = new Error('Uh oh!')
      onceMock.mockImplementationOnce((_, cb) => cb(null, { err }))
      expect(saveFile(filename, data)).rejects.toEqual(err)
    })
  })

  describe('readFile', () => {
    const filename = 'hello.txt'
    const data = { foo: 'bar' }

    it('sends a "read file" request to the ipcRenderer', async () => {
      onceMock.mockImplementationOnce((_, cb) => cb(null, { err: null, data }))
      await readFile(filename)

      expect(sendMock).toBeCalledWith(READ_FILE, filename, uuidResult)
    })

    it('passes through a response from the ipcRenderer', async () => {
      onceMock.mockImplementationOnce((_, cb) => cb(null, { err: null, data }))
      const result = await readFile<typeof data>(filename)
      expect(onceMock).toBeCalled()
      expect(onceMock.mock.calls[onceMock.mock.calls.length - 1][0]).toBe(
        `${READ_FILE_RESULT}:${uuidResult}`
      )
      expect(result).toEqual(data)
    })

    it('throws an exception if the read failed', () => {
      let err = new Error('Uh oh!')
      onceMock.mockImplementationOnce((_, cb) => cb(null, { err }))
      expect(readFile(filename)).rejects.toEqual(err)
    })
  })

  describe('settings hydration', () => {
    const settings = {
      settings: {
        scrollback: false,
        scrollbackLines: 2,
        timestamps: true,
        timestampsFormat: 'hello',
        urlgrabber: false,
        maxurl: 500,
        autoaway: true,
        defquit: 'quit',
        defleave: 'leave',
        defaway: 'away',
        showawayonce: false,
        hidejoin: true,
        hidenicknamechange: false,
        downloadFolder: 'download',
        soundChannel: true,
        soundPrivate: false,
        userName: 'user',
        realName: 'real',
      },
      theme: {
        mode: 'dark',
        size: 'cozy',
      },
    }

    it('should dispatch to update the settings', () => {
      hydrateSettings(settings as any)
      const updateSettingsAction = {
        type: 'EDIT_SETTINGS',
        payload: settings.settings,
      }
      expect(dispatchMock).toBeCalledWith(updateSettingsAction)
    })

    it('should dispatch to update the theme', () => {
      hydrateSettings(settings as any)
      const setModeAction = {
        type: 'SET_MODE',
        payload: settings.theme.mode,
      }
      const setSizeAction = {
        type: 'SET_SIZE',
        payload: settings.theme.size,
      }
      expect(dispatchMock).toBeCalledWith(setModeAction)
      expect(dispatchMock).toBeCalledWith(setSizeAction)
    })
  })
})
