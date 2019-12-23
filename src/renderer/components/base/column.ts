import styled from '@emotion/styled'
import { css } from '@emotion/core'
import { media } from './utils'

const columnGap = '0.75em'

interface IColumnProps {
  size?: number | 'narrow' | 'full'
  offsetSize?: number
}

export const Column = styled.div<IColumnProps>`
  display: block;
  flex-basis: 0;
  flex-grow: 1;
  flex-shrink: 1;
  padding: ${columnGap};
  ${(props: IColumnProps) => media.tablet`
      ${props.offsetSize &&
        css`
          margin-left: ${(props.offsetSize / 12) * 100}%;
        `}
      ${
        props.size === 'narrow' || props.size === undefined
          ? css`
              flex: none;
            `
          : props.size === 'full'
          ? css`
              flex: none;
              width: 100%;
            `
          : props.size >= 1
          ? css`
              flex: none;
              width: ${(props.size / 12) * 100}%;
            `
          : props.size < 1
          ? css`
              flex: none;
              width: ${props.size}%;
            `
          : false
      }
    `};
`

interface IColumnsProps {
  alignment?: 'left' | 'center'
  isGapless?: boolean
  isMultiline?: boolean
  isVcentered?: boolean
}

export const Columns = styled.div<IColumnsProps>`
    margin-left: -${columnGap};
    margin-right: -${columnGap};
    margin-top: -${columnGap};
    &:last-child {
      margin-bottom: -${columnGap};
    }
    &:not(:last-child) {
      margin-bottom: calc(1.5em - ${columnGap});
    }
    ${(props: IColumnsProps) =>
      props.alignment === 'center' &&
      css`
        justify-content: center;
      `}
    ${(props: IColumnsProps) =>
      props.isGapless &&
      css`
        margin-left: 0;
        margin-right: 0;
        margin-top: 0;
        & > ${/* sc-selector */ Column} {
          margin: 0;
          padding: 0;
        }
        &:not(:last-child) {
          margin-bottom: 1.5em;
        }
        &:last-child {
          margin-bottom: 0;
        }
      `}
    ${(props: IColumnsProps) =>
      props.isMultiline &&
      css`
        flex-wrap: wrap;
      `}
    ${(props: IColumnsProps) =>
      props.isVcentered &&
      css`
        align-items: center;
      `}
    ${media.tablet`
      display: flex;
    `}
  `
