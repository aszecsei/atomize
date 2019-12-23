import styled from '@emotion/styled'
import { themeValues } from '../../theme'

export const Chat = styled.div`
  position: relative;
  min-width: 0;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  overflow: hidden;
  background: ${themeValues.backgroundPrimary};
`
