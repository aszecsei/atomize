import { getAddServerModalOpen, RootState } from '../../store'
import { toggleAddServerModal } from '../../store/system/actions'
import { connect } from 'react-redux'
import AddServerModal from './display'
import { addServer } from '../../store/connections/actions'

const mapState = (state: RootState) => {
  return {
    visible: getAddServerModalOpen(state),
  }
}

const mapDispatch = {
  onClose: toggleAddServerModal,
  addServer,
}

export default connect(mapState, mapDispatch)(AddServerModal)
