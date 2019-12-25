import styled from '@emotion/styled'
import { fontWeights, themeValues } from '../../theme'

export const ContextMenu = styled.div`
  position: fixed;
  display: block;
  box-sizing: border-box;
  border-radius: 4px;
  padding: 6px 8px;
  cursor: default;
  background-color: ${themeValues.backgroundFloating};
  box-shadow: ${themeValues.elevationHigh};
  height: auto;
  min-width: 188px;
  max-width: 320px;
`

export const ItemGroup = styled.div`
  &:not(:first-of-type):not(:empty) {
    border-top: 1px solid ${themeValues.backgroundModifierAccent};
  }
`

type ItemStyles = 'primary' | 'danger'
const colorForItemStyle = (style: ItemStyles = 'primary', hover: boolean) => {
  switch (style) {
    case 'primary':
      return hover
        ? themeValues.interactiveHover
        : themeValues.interactiveNormal
    case 'danger':
      return themeValues.colorDanger
  }
}
interface IItemProps {
  itemStyle?: ItemStyles
}
export const Item = styled.div<IItemProps>`
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  justify-content: space-between;

  position: relative;
  font-weight: ${fontWeights.normal};
  box-sizing: border-box;
  margin-top: 2px;
  margin-bottom: 2px;
  padding: 0 8px;
  font-size: 14px;
  line-height: 18px;
  min-height: 32px;
  display: flex;
  align-items: center;
  border-radius: 2px;
  color: ${props => colorForItemStyle(props.itemStyle, false)};

  &:hover {
    color: ${props => colorForItemStyle(props.itemStyle, true)};
    background-color: ${themeValues.backgroundModifierHover};
    cursor: pointer;
  }
  &:active {
    color: ${props => colorForItemStyle(props.itemStyle, false)};
    background-color: ${themeValues.backgroundModifierActive};
  }
`

export const Label = styled.div`
  flex: 1 1 auto;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`
