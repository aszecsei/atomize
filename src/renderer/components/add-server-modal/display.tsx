import * as React from 'react'
import Modal from '../layout/modal'
import * as Form from '../forms'
import produce from 'immer'

interface IAddServerModalProps {
  visible?: boolean
  onClose: () => void
  addServer: (
    name: string,
    url: string,
    nickname: string,
    channels: string[]
  ) => void
}

interface IAddServerModalState {
  name: string
  url: string
  nickname: string
  channels: string[]
}

class AddServerModal extends React.Component<
  IAddServerModalProps,
  IAddServerModalState
> {
  state = {
    name: '',
    url: '',
    nickname: '',
    channels: [],
  }

  render() {
    return (
      <Modal
        title="Add Server"
        open={this.props.visible}
        onClose={this.props.onClose}
      >
        <form onSubmit={() => {}}>
          <Form.Field>
            <Form.Label>Server Name</Form.Label>
            <Form.Control>
              <Form.Input
                type="text"
                value={this.state.name}
                onChange={e => {
                  this.setState({ name: e.target.value })
                }}
              />
            </Form.Control>
          </Form.Field>
          <Form.Field>
            <Form.Label>Server URL</Form.Label>
            <Form.Control>
              <Form.Input
                type="text"
                value={this.state.url}
                onChange={e => {
                  this.setState({ url: e.target.value })
                }}
              />
            </Form.Control>
          </Form.Field>
          <Form.Field>
            <Form.Label>Nickname</Form.Label>
            <Form.Control>
              <Form.Input
                type="text"
                value={this.state.nickname}
                onChange={e => {
                  this.setState({ nickname: e.target.value })
                }}
              />
            </Form.Control>
          </Form.Field>
          <Form.Field>
            <Form.Label>Channels</Form.Label>
            {this.state.channels.map((c, idx) => (
              <Form.Control key={idx}>
                <Form.Input
                  type="text"
                  value={c}
                  onChange={e => {
                    const v = e.target.value
                    this.setState(
                      produce(draft => {
                        draft.channels[idx] = v
                      })
                    )
                  }}
                />
                <button
                  onClick={e => {
                    this.setState(
                      produce(draft => {
                        draft.channels.splice(idx, 1)
                      })
                    )
                    e.preventDefault()
                  }}
                >
                  Remove Channel
                </button>
              </Form.Control>
            ))}
            <button
              onClick={e => {
                this.setState(
                  produce(draft => {
                    draft.channels.push('')
                  })
                )
                e.preventDefault()
              }}
            >
              Add Channel
            </button>
          </Form.Field>
          <Form.Field>
            <Form.Control>
              <button
                onClick={e => {
                  e.preventDefault()
                  this.props.addServer(
                    this.state.name,
                    this.state.url,
                    this.state.nickname,
                    this.state.channels
                  )
                  this.props.onClose()
                }}
              >
                Add Server
              </button>
            </Form.Control>
          </Form.Field>
        </form>
      </Modal>
    )
  }
}

export default AddServerModal
