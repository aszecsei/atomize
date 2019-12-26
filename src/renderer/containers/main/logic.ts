import ChatPanel from './display'
import { connect } from 'react-redux'
import { RootState, getSelectedChannel } from '../../store'

const mapState = (state: RootState) => {
  return {
    messages: getSelectedChannel(state)?.log,
  }
}

const mapDispatch = null

export default connect(mapState, mapDispatch)(ChatPanel)
