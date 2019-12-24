import styled from '@emotion/styled'
import { themeValues, fontWeights } from '../../theme'
import { css } from '@emotion/core'

interface IFieldProps {
  isHorizontal?: boolean
}
export const Field = styled.div<IFieldProps>`
  ${props =>
    props.isHorizontal
      ? css`
          display: flex;
        `
      : null}
  &:not(:last-child) {
    margin-bottom: 0.75rem;
  }
`

export const Control = styled.div`
  box-sizing: border-box;
  clear: both;
  font-size: 1rem;
  position: relative;
  text-align: left;
`

export const Label = styled.label`
  &:not(:last-child) {
    margin-bottom: 0.5em;
  }
  color: ${themeValues.headerPrimary};
  display: block;
  font-size: 1rem;
  font-weight: ${fontWeights.medium};
`

export const Help = styled.p`
  display: block;
  font-size: 0.75rem;
  margin-top: 0.25rem;
`

export const Input = styled.input``
