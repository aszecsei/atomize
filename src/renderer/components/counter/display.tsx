import * as React from 'react'
import styled from '@emotion/styled'

import { backgroundColor, textColor } from '../../theme'

interface ICounterProps {
  value: number
  increment: () => void
  reset: () => void
}

const Header = styled.h1`
  background-color: ${backgroundColor};
  color: ${textColor};
`

export const Counter = (props: ICounterProps) => (
  <>
    <Header>Counter: {props.value}</Header>
    <button onClick={props.increment}>Increment</button>
    <button onClick={props.reset}>Reset</button>
  </>
)

export default Counter
