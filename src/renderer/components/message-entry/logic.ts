import ChatPanel from './display'
import { connect } from 'react-redux'
import { RootState, getSelectedChannel } from '../../store'
import { sendMessage } from '../../store/connections/actions'

const mapState = (state: RootState) => {
  return {
    selectedChannel: getSelectedChannel(state),
  }
}

const mapDispatch = {
  sendMessage,
}

export default connect(mapState, mapDispatch)(ChatPanel)
