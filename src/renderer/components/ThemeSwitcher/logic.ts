import ThemeSwitcher from './display'

import { setMode } from '../../store/gui/actions'
import { modeSelector } from '../../store/gui/reducers'
import { RootState, guiSelector } from '../../store'
import { connect } from 'react-redux'

const mapState = (state: RootState) => ({
  mode: modeSelector(guiSelector(state)),
})

const mapDispatch = {
  setMode,
}

export default connect(mapState, mapDispatch)(ThemeSwitcher)
