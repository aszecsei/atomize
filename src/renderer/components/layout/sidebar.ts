import styled from '@emotion/styled'
import { themeValues } from '../../theme'

export const Sidebar = styled.div`
  flex-direction: column;
  min-height: 100%;
  width: 240px;
  flex: 0 0 auto;
  background: ${themeValues.backgroundSecondary};
  display: flex;
  overflow: hidden;
`
