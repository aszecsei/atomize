import * as React from 'react'
import Modal from '../layout/modal'
import * as Form from '../forms'
import { ISettingsState } from '../../store/settings/types'

interface ISettingsModalProps {
  visible?: boolean
  settings: ISettingsState
  onClose?: () => void
  onUpdate: (update: Partial<ISettingsState>) => void
}

const SettingsModal = (props: ISettingsModalProps) => (
  <Modal open={props.visible} onClose={props.onClose} title="Settings">
    <form onSubmit={() => {}}>
      <Form.Field>
        <Form.Label>Scrollback</Form.Label>
        <Form.Control>
          <Form.Input
            type="checkbox"
            checked={props.settings.scrollback}
            onChange={() => {
              props.onUpdate({ scrollback: !props.settings.scrollback })
            }}
          />
        </Form.Control>
      </Form.Field>
      <label>
        Scrollback Lines:
        <input
          type="number"
          value={props.settings.scrollbackLines}
          onChange={e => {
            props.onUpdate({ scrollbackLines: e.target.valueAsNumber })
          }}
        />
      </label>
      <label>
        Timestamps:
        <input
          type="checkbox"
          checked={props.settings.timestamps}
          onChange={() => {
            props.onUpdate({ timestamps: !props.settings.timestamps })
          }}
        />
      </label>
      <label>
        Time Format:
        <input
          type="text"
          value={props.settings.timeFormat}
          onChange={e => {
            props.onUpdate({ timeFormat: e.target.value })
          }}
        />
      </label>
      <label>
        URL Grabber:
        <input
          type="checkbox"
          checked={props.settings.urlgrabber}
          onChange={() => {
            props.onUpdate({ urlgrabber: !props.settings.urlgrabber })
          }}
        />
      </label>
      <label>
        Max URL Length:
        <input
          type="number"
          value={props.settings.maxurl}
          onChange={e => {
            props.onUpdate({ maxurl: e.target.valueAsNumber })
          }}
        />
      </label>
      <label>
        Auto-Away:
        <input
          type="checkbox"
          checked={props.settings.autoaway}
          onChange={() => {
            props.onUpdate({ autoaway: !props.settings.autoaway })
          }}
        />
      </label>
      <label>
        Quit Message:
        <input
          type="text"
          value={props.settings.defquit}
          onChange={e => {
            props.onUpdate({ defquit: e.target.value })
          }}
        />
      </label>
      <label>
        Leave Message:
        <input
          type="text"
          value={props.settings.defleave}
          onChange={e => {
            props.onUpdate({ defleave: e.target.value })
          }}
        />
      </label>
      <label>
        Away Message:
        <input
          type="text"
          value={props.settings.defaway}
          onChange={e => {
            props.onUpdate({ defaway: e.target.value })
          }}
        />
      </label>
      <label>
        Show Away Once:
        <input
          type="checkbox"
          checked={props.settings.showawayonce}
          onChange={() => {
            props.onUpdate({ showawayonce: !props.settings.showawayonce })
          }}
        />
      </label>
      <label>
        Hide Join:
        <input
          type="checkbox"
          checked={props.settings.hidejoin}
          onChange={() => {
            props.onUpdate({ hidejoin: !props.settings.hidejoin })
          }}
        />
      </label>
      <label>
        Hide Nickname Change:
        <input
          type="checkbox"
          checked={props.settings.hidenicknamechange}
          onChange={() => {
            props.onUpdate({
              hidenicknamechange: !props.settings.hidenicknamechange,
            })
          }}
        />
      </label>
      <label>
        Download Folder:
        <input
          type="text"
          value={props.settings.downloadFolder}
          onChange={e => {
            props.onUpdate({ downloadFolder: e.target.value })
          }}
        />
      </label>
      <label>
        Sound Channel:
        <input
          type="checkbox"
          checked={props.settings.soundChannel}
          onChange={() => {
            props.onUpdate({ soundChannel: !props.settings.soundChannel })
          }}
        />
      </label>
      <label>
        Sound Private:
        <input
          type="checkbox"
          checked={props.settings.soundPrivate}
          onChange={() => {
            props.onUpdate({ soundPrivate: !props.settings.soundPrivate })
          }}
        />
      </label>
      <label>
        Username:
        <input
          type="text"
          value={props.settings.userName}
          onChange={e => {
            props.onUpdate({ userName: e.target.value })
          }}
        />
      </label>
      <label>
        Real Name:
        <input
          type="text"
          value={props.settings.realName}
          onChange={e => {
            props.onUpdate({ realName: e.target.value })
          }}
        />
      </label>
      <input type="submit" value="Save" />
    </form>
  </Modal>
)

export default SettingsModal
