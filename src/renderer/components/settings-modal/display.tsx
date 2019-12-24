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
    <form onSubmit={(e) => { e.preventDefault(); }}>
      <Form.Field>
        <Form.Label>Scrollback</Form.Label>
        <Form.Control>
          <Form.Checkbox
            checked={props.settings.scrollback}
            onChange={() => {
              props.onUpdate({ scrollback: !props.settings.scrollback })
            }}
          />
        </Form.Control>
      </Form.Field>
      <Form.Label>
        Scrollback Lines:
        <Form.Input
          type="number"
          value={props.settings.scrollbackLines}
          onChange={e => {
            props.onUpdate({ scrollbackLines: e.target.valueAsNumber })
          }}
        />
      </Form.Label>
      <Form.Label>
        Timestamps:
        <Form.Checkbox
          checked={props.settings.timestamps}
          onChange={() => {
            props.onUpdate({ timestamps: !props.settings.timestamps })
          }}
        />
      </Form.Label>
      <Form.Label>
        Time Format:
        <Form.Input
          type="text"
          value={props.settings.timeFormat}
          onChange={e => {
            props.onUpdate({ timeFormat: e.target.value })
          }}
        />
      </Form.Label>
      <Form.Label>
        URL Grabber:
        <Form.Checkbox
          checked={props.settings.urlgrabber}
          onChange={() => {
            props.onUpdate({ urlgrabber: !props.settings.urlgrabber })
          }}
        />
      </Form.Label>
      <Form.Label>
        Max URL Length:
        <Form.Input
          type="number"
          value={props.settings.maxurl}
          onChange={e => {
            props.onUpdate({ maxurl: e.target.valueAsNumber })
          }}
        />
      </Form.Label>
      <Form.Label>
        Auto-Away:
        <Form.Checkbox
          checked={props.settings.autoaway}
          onChange={() => {
            props.onUpdate({ autoaway: !props.settings.autoaway })
          }}
        />
      </Form.Label>
      <Form.Label>
        Quit Message:
        <Form.Input
          type="text"
          value={props.settings.defquit}
          onChange={e => {
            props.onUpdate({ defquit: e.target.value })
          }}
        />
      </Form.Label>
      <Form.Label>
        Leave Message:
        <Form.Input
          type="text"
          value={props.settings.defleave}
          onChange={e => {
            props.onUpdate({ defleave: e.target.value })
          }}
        />
      </Form.Label>
      <Form.Label>
        Away Message:
        <Form.Input
          type="text"
          value={props.settings.defaway}
          onChange={e => {
            props.onUpdate({ defaway: e.target.value })
          }}
        />
      </Form.Label>
      <Form.Label>
        Show Away Once:
        <Form.Checkbox
          checked={props.settings.showawayonce}
          onChange={() => {
            props.onUpdate({ showawayonce: !props.settings.showawayonce })
          }}
        />
      </Form.Label>
      <Form.Label>
        Hide Join:
        <Form.Checkbox
          checked={props.settings.hidejoin}
          onChange={() => {
            props.onUpdate({ hidejoin: !props.settings.hidejoin })
          }}
        />
      </Form.Label>
      <Form.Label>
        Hide Nickname Change:
        <Form.Checkbox
          checked={props.settings.hidenicknamechange}
          onChange={() => {
            props.onUpdate({
              hidenicknamechange: !props.settings.hidenicknamechange,
            })
          }}
        />
      </Form.Label>
      <Form.Label>
        Download Folder:
        <Form.Input
          type="text"
          value={props.settings.downloadFolder}
          onChange={e => {
            props.onUpdate({ downloadFolder: e.target.value })
          }}
        />
      </Form.Label>
      <Form.Label>
        Sound Channel:
        <Form.Checkbox
          checked={props.settings.soundChannel}
          onChange={() => {
            props.onUpdate({ soundChannel: !props.settings.soundChannel })
          }}
        />
      </Form.Label>
      <Form.Label>
        Sound Private:
        <Form.Checkbox
          checked={props.settings.soundPrivate}
          onChange={() => {
            props.onUpdate({ soundPrivate: !props.settings.soundPrivate })
          }}
        />
      </Form.Label>
      <Form.Label>
        Username:
        <Form.Input
          type="text"
          value={props.settings.userName}
          onChange={e => {
            props.onUpdate({ userName: e.target.value })
          }}
        />
      </Form.Label>
      <Form.Label>
        Real Name:
        <Form.Input
          type="text"
          value={props.settings.realName}
          onChange={e => {
            props.onUpdate({ realName: e.target.value })
          }}
        />
      </Form.Label>
      <Form.Input type="submit" value="Save" onClick={props.onClose} />
    </form>
  </Modal>
)
// TODO: add onSave functionality

export default SettingsModal
