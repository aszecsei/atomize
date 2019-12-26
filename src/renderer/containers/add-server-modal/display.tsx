import * as React from 'react'
import Modal from '../../components/layout/modal'
import * as Form from '../../components/forms'
import produce from 'immer'
import styled from '@emotion/styled'

const HPadding = styled.div`
  width: 16px;
`

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
        <Form.Form onSubmit={() => {}}>
          <Form.Field>
            <Form.Control>
              <Form.Label>Server Name</Form.Label>
              <Form.Input
                type="text"
                value={this.state.name}
                onChange={e => {
                  this.setState({ name: e.target.value })
                }}
              />
            </Form.Control>
            <Form.Control>
              <Form.Label>Server URL</Form.Label>
              <Form.Input
                type="text"
                value={this.state.url}
                onChange={e => {
                  this.setState({ url: e.target.value })
                }}
              />
            </Form.Control>
            <Form.Control>
              <Form.Label>Nickname</Form.Label>
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
                <HPadding />
                <Form.Button
                  btnStyle="warning"
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
                </Form.Button>
              </Form.Control>
            ))}
            <Form.Button
              btnStyle="primary"
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
            </Form.Button>
          </Form.Field>
          <Form.ButtonGroup direction="horizontal">
            <Form.Button
              type="submit"
              btnStyle="success"
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
            </Form.Button>

            <Form.Button
              type="button"
              btnStyle="danger"
              align="right"
              onClick={e => {
                this.props.onClose()
              }}
            >
              Cancel
            </Form.Button>
          </Form.ButtonGroup>
        </Form.Form>
      </Modal>
    )
  }
}

export default AddServerModal
