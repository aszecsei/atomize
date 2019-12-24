import { toggleEditSettingsModal } from '../../store/system/actions'
import LeftPanel from './display'
import { connect } from 'react-redux'

const mapState = null

const mapDispatch = {
  editSettings: toggleEditSettingsModal,
}

export default connect(mapState, mapDispatch)(LeftPanel)
