import { toggleEditSettingsModal } from '../../store/system/actions'
import { selectChannel, selectServer } from '../../store/connections/actions'
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
  selectChannel,
  selectServer,
}

export default connect(mapState, mapDispatch)(LeftPanel)
