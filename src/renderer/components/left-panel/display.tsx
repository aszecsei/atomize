import * as React from 'react'

import { Column } from '../base/column'

interface ILeftPanelProps {}

const LeftPanel = (props: ILeftPanelProps) => (
  <Column size={2}>
    <h1>Left Panel</h1>
  </Column>
)

export default LeftPanel
