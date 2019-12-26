import * as React from 'react'
import Modal from '../../components/layout/modal'
import * as Form from '../../components/forms'
import { ISettingsState } from '../../store/settings/types'

interface ISettingsModalProps {
  visible?: boolean
  settings: ISettingsState
  onClose?: () => void
  onUpdate: (update: Partial<ISettingsState>) => void
}

const SettingsModal = (props: ISettingsModalProps) => (
  <Modal open={props.visible} onClose={props.onClose} title="Settings">
    <Form.Form
      onSubmit={e => {
        e.preventDefault()
      }}
    >
      <Form.Control>
        <Form.Label>Scrollback:</Form.Label>
        <Form.Checkbox
          checked={props.settings.scrollback}
          onChange={() => {
            props.onUpdate({ scrollback: !props.settings.scrollback })
          }}
        />
      </Form.Control>
      <Form.Control>
        <Form.Label>Scrollback Lines:</Form.Label>
        <Form.Input
          type="number"
          value={props.settings.scrollbackLines}
          onChange={e => {
            props.onUpdate({ scrollbackLines: e.target.valueAsNumber })
          }}
        />
      </Form.Control>
      <Form.Control>
        <Form.Label>Timestamps:</Form.Label>
        <Form.Checkbox
          checked={props.settings.timestamps}
          onChange={() => {
            props.onUpdate({ timestamps: !props.settings.timestamps })
          }}
        />
      </Form.Control>
      <Form.Control>
        <Form.Label>Time Format:</Form.Label>
        <Form.Input
          type="text"
          value={props.settings.timeFormat}
          onChange={e => {
            props.onUpdate({ timeFormat: e.target.value })
          }}
        />
      </Form.Control>
      <Form.Control>
        <Form.Label>URL Grabber:</Form.Label>
        <Form.Checkbox
          checked={props.settings.urlgrabber}
          onChange={() => {
            props.onUpdate({ urlgrabber: !props.settings.urlgrabber })
          }}
        />
      </Form.Control>
      <Form.Control>
        <Form.Label>Max URL Length:</Form.Label>
        <Form.Input
          type="number"
          value={props.settings.maxurl}
          onChange={e => {
            props.onUpdate({ maxurl: e.target.valueAsNumber })
          }}
        />
      </Form.Control>
      <Form.Control>
        <Form.Label>Auto-Away:</Form.Label>
        <Form.Checkbox
          checked={props.settings.autoaway}
          onChange={() => {
            props.onUpdate({ autoaway: !props.settings.autoaway })
          }}
        />
      </Form.Control>
      <Form.Control>
        <Form.Label>Quit Message:</Form.Label>
        <Form.Input
          type="text"
          value={props.settings.defquit}
          onChange={e => {
            props.onUpdate({ defquit: e.target.value })
          }}
        />
      </Form.Control>
      <Form.Control>
        <Form.Label>Leave Message:</Form.Label>
        <Form.Input
          type="text"
          value={props.settings.defleave}
          onChange={e => {
            props.onUpdate({ defleave: e.target.value })
          }}
        />
      </Form.Control>
      <Form.Control>
        <Form.Label>Away Message:</Form.Label>
        <Form.Input
          type="text"
          value={props.settings.defaway}
          onChange={e => {
            props.onUpdate({ defaway: e.target.value })
          }}
        />
      </Form.Control>
      <Form.Control>
        <Form.Label>Show Away Once:</Form.Label>
        <Form.Checkbox
          checked={props.settings.showawayonce}
          onChange={() => {
            props.onUpdate({ showawayonce: !props.settings.showawayonce })
          }}
        />
      </Form.Control>
      <Form.Control>
        <Form.Label>Hide Join:</Form.Label>
        <Form.Checkbox
          checked={props.settings.hidejoin}
          onChange={() => {
            props.onUpdate({ hidejoin: !props.settings.hidejoin })
          }}
        />
      </Form.Control>
      <Form.Control>
        <Form.Label>Hide Nickname Change:</Form.Label>
        <Form.Checkbox
          checked={props.settings.hidenicknamechange}
          onChange={() => {
            props.onUpdate({
              hidenicknamechange: !props.settings.hidenicknamechange,
            })
          }}
        />
      </Form.Control>
      <Form.Control>
        <Form.Label>Download Folder:</Form.Label>
        <Form.Input
          type="text"
          value={props.settings.downloadFolder}
          onChange={e => {
            props.onUpdate({ downloadFolder: e.target.value })
          }}
        />
      </Form.Control>
      <Form.Control>
        <Form.Label>Sound Channel:</Form.Label>
        <Form.Checkbox
          checked={props.settings.soundChannel}
          onChange={() => {
            props.onUpdate({ soundChannel: !props.settings.soundChannel })
          }}
        />
      </Form.Control>
      <Form.Control>
        <Form.Label>Sound Private:</Form.Label>
        <Form.Checkbox
          checked={props.settings.soundPrivate}
          onChange={() => {
            props.onUpdate({ soundPrivate: !props.settings.soundPrivate })
          }}
        />
      </Form.Control>
      <Form.Control>
        <Form.Label>Username:</Form.Label>
        <Form.Input
          type="text"
          value={props.settings.userName}
          onChange={e => {
            props.onUpdate({ userName: e.target.value })
          }}
        />
      </Form.Control>
      <Form.Control>
        <Form.Label>Real Name:</Form.Label>
        <Form.Input
          type="text"
          value={props.settings.realName}
          onChange={e => {
            props.onUpdate({ realName: e.target.value })
          }}
        />
      </Form.Control>
      <Form.ButtonGroup direction="horizontal">
        <Form.Button type="submit" btnStyle="success">
          Save
        </Form.Button>
        <Form.Button
          type="button"
          onClick={props.onClose}
          align="right"
          btnStyle="danger"
        >
          Cancel
        </Form.Button>
      </Form.ButtonGroup>
    </Form.Form>
  </Modal>
)
// TODO: add onSave functionality

export default SettingsModal
