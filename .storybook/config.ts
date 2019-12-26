import { configure, addDecorator } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'
import { withA11y } from '@storybook/addon-a11y'

import themeDecorator from './themeDecorator'

addDecorator(withInfo)
addDecorator(themeDecorator)
addDecorator(withA11y)

// automatically import all files ending in *.stories.js
configure(
  require.context(
    '../src/renderer/components',
    true,
    /\.stories\.(ts|tsx|js|jsx)$/
  ),
  module
)
