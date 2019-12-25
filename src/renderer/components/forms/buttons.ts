import styled from '@emotion/styled'
import { css } from '@emotion/core'
import { darken, transparentize } from 'polished'
import { themeValues } from '../../theme'
import { unselectable } from '../utils'

interface IButtonGroupProps {
  direction?: 'horizontal' | 'vertical'
}

export const ButtonGroup = styled.div<IButtonGroupProps>`
  display: flex;
  flex-direction: ${props =>
    props.direction === 'horizontal' ? 'row' : 'column'};
`

type BtnAlignment = 'left' | 'right'

type BtnStyles = 'primary' | 'link' | 'info' | 'success' | 'warning' | 'danger'
type BtnModes = 'normal' | 'focus' | 'hover' | 'active'
interface IButtonProps {
  btnStyle?: BtnStyles
  align?: BtnAlignment
}
const getBgColorForButtonStyle = (btnStyle?: BtnStyles, mode?: BtnModes) => {
  let col
  switch (btnStyle) {
    case 'primary':
      col = themeValues.colorPrimary
      break
    case 'link':
      col = themeValues.colorLink
      break
    case 'info':
      col = themeValues.colorInfo
      break
    case 'success':
      col = themeValues.colorSuccess
      break
    case 'warning':
      col = themeValues.colorWarning
      break
    case 'danger':
      col = themeValues.colorDanger
      break
    default:
      col = themeValues.colorPrimary
  }

  switch (mode) {
    case 'normal':
      return col
    case 'focus':
      return transparentize(0.3, darken(0.01, col))
    case 'hover':
      return transparentize(0.1, darken(0.05, col))
    case 'active':
      return transparentize(0.1, darken(0.07, col))
    default:
      return col
  }
}
export const Button = styled.button<IButtonProps>`
  background-color: ${props =>
    getBgColorForButtonStyle(props.btnStyle, 'normal')};
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 4px;
  flex: 0 1 auto;
  color: white;
  padding: 10px 20px;
  text-decoration: none;
  margin: 5px 4px;
  ${unselectable};
  ${props =>
    props.align === 'right'
      ? css`
          margin-left: auto;
        `
      : null}
  cursor: pointer;
  &:focus {
    background-color: ${props =>
      getBgColorForButtonStyle(props.btnStyle, 'focus')};
  }
  &:hover {
    background-color: ${props =>
      getBgColorForButtonStyle(props.btnStyle, 'hover')};
  }
  &:active {
    background-color: ${props =>
      getBgColorForButtonStyle(props.btnStyle, 'active')};
  }
`
