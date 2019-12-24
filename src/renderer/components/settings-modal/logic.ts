import { getEditSettingsModalOpen, RootState } from '../../store'
import { toggleEditSettingsModal } from '../../store/system/actions'
import { connect } from 'react-redux'
import SettingsModal from './display'

const mapState = (state: RootState) => {
  return {
    visible: getEditSettingsModalOpen(state),
  }
}

const mapDispatch = {
  onClose: toggleEditSettingsModal,
}

export default connect(mapState, mapDispatch)(SettingsModal)
