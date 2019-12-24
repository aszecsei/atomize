import * as React from 'react'
import Modal from '../layout/modal'
import * as Form from '../forms'

interface ISettingsModalProps {
  visible?: boolean
  onClose?: () => void
}

const SettingsModal = (props: ISettingsModalProps) => (
  <Modal open={props.visible} onClose={props.onClose} title="Settings">
    <form onSubmit={() => {}}>
      <Form.Field>
        <Form.Label>Scrollback</Form.Label>
        <Form.Control>
          <Form.Input type="checkbox" />
        </Form.Control>
      </Form.Field>
      <label>
        Scrollback Lines:
        <input type="number" />
      </label>
      <label>
        Timestamps:
        <input type="checkbox" />
      </label>
      <label>
        Time Format:
        <input type="text" />
      </label>
      <label>
        URL Grabber:
        <input type="checkbox" />
      </label>
      <label>
        Max URLs:
        <input type="number" />
      </label>
      <label>
        Auto-Away:
        <input type="checkbox" />
      </label>
      <label>
        Quit Message:
        <input type="text" />
      </label>
      <label>
        Leave Message:
        <input type="text" />
      </label>
      <label>
        Away Message:
        <input type="text" />
      </label>
      <label>
        Show Away Once:
        <input type="checkbox" />
      </label>
      <label>
        Hide Join:
        <input type="checkbox" />
      </label>
      <label>
        Hide Nickname Change:
        <input type="checkbox" />
      </label>
      <label>
        Download Folder:
        <input type="text" />
      </label>
      <label>
        Sound Channel:
        <input type="checkbox" />
      </label>
      <label>
        Sound Private:
        <input type="checkbox" />
      </label>
      <label>
        Username:
        <input type="text" />
      </label>
      <label>
        Real Name:
        <input type="text" />
      </label>
      <input type="submit" value="Save" />
    </form>
  </Modal>
)

export default SettingsModal
