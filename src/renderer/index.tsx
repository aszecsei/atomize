import * as React from 'react'
import * as ReactDOM from 'react-dom'

import { App } from './app'

// Append a section for our popout context menus
let popoutsDiv = document.createElement('div')
popoutsDiv.id = 'popouts'
document.body.appendChild(popoutsDiv)

ReactDOM.render(<App />, document.getElementById('app'))
