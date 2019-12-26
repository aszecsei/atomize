import { getEditSettingsModalOpen, RootState, getSettings } from '../../store'
import { toggleEditSettingsModal } from '../../store/system/actions'
import { connect } from 'react-redux'
import SettingsModal from './display'
import { editSettings } from '../../store/settings/actions'

const mapState = (state: RootState) => {
  return {
    visible: getEditSettingsModalOpen(state),
    settings: getSettings(state),
  }
}

const mapDispatch = {
  onClose: toggleEditSettingsModal,
  onUpdate: editSettings,
}

export default connect(mapState, mapDispatch)(SettingsModal)
