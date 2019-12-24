import * as React from 'react'
import Modal from '../layout/modal'
import * as Form from '../forms'
import { ISettingsState } from '../../store/settings/types'

interface IAddServerModalProps {
  visible?: boolean
  onClose?: () => void
  addServer: (
    name: string,
    url: string,
    nickname: string,
    channels: string[]
  ) => void
}

const AddServerModal = (props: IAddServerModalProps) => (
  <Modal title="Add Server" open={props.visible} onClose={props.onClose}>
    <h2>Hello, world!</h2>
  </Modal>
)

export default AddServerModal
