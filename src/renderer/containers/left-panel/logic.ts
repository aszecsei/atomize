import {
  toggleEditSettingsModal,
  toggleAddServerModal,
} from '../../store/system/actions'
import {
  selectChannel,
  selectServer,
  connectToServer,
  disconnectFromServer,
  removeServer,
} from '../../store/connections/actions'
import LeftPanel from './display'
import { connect } from 'react-redux'
import {
  getServers,
  RootState,
  getSelectedServerId,
  getSelectedChannelId,
} from '../../store'

const mapState = (state: RootState) => {
  return {
    servers: getServers(state),
    selectedServerId: getSelectedServerId(state),
    selectedChannelId: getSelectedChannelId(state),
  }
}

const mapDispatch = {
  editSettings: toggleEditSettingsModal,
  addServer: toggleAddServerModal,
  selectChannel,
  selectServer,
  connectToServer,
  disconnectFromServer,
  removeServer,
}

export default connect(mapState, mapDispatch)(LeftPanel)
