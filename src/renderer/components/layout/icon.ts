import styled from '@emotion/styled'
import { css } from '@emotion/core'

const iconDimensions = '1.5em'
const iconDimensionsSmall = '1em'
const iconDimensionsMedium = '2em'
const iconDimensionsLarge = '3em'

interface IIconProps {
  size?: 'small' | 'normal' | 'medium' | 'large'
}

export const Icon = styled.span<IIconProps>`
  align-items: center;
  vertical-align: 'middle';
  display: inline-flex;
  justify-content: center;
  height: ${iconDimensions};
  width: ${iconDimensions};
  ${(props: IIconProps) =>
    props.size === 'small' &&
    css`
      height: ${iconDimensionsSmall};
      width: ${iconDimensionsSmall};
    `}
  ${(props: IIconProps) =>
    props.size === 'medium' &&
    css`
      height: ${iconDimensionsMedium};
      width: ${iconDimensionsMedium};
    `}
  ${(props: IIconProps) =>
    props.size === 'large' &&
    css`
      height: ${iconDimensionsLarge};
      width: ${iconDimensionsLarge};
    `}
`
