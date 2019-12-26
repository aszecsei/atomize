import * as React from 'react'
import styled from '@emotion/styled'
import { themeValues, fontWeights } from '../../theme'

const SearchBar = styled.div`
  position: relative;
  z-index: 2;
  flex: 0 0 auto;
  padding: 0 10px;
  height: 48px;
  display: flex;
  align-items: center;
  box-shadow: ${themeValues.elevationLow};
`

const SearchBarButton = styled.button`
  width: 100%;
  height: 28px;
  border-radius: 4px;
  background-color: ${themeValues.backgroundTertiary};
  box-shadow: none;
  color: ${themeValues.textMuted};
  text-align: left;
  font-size: 14px;
  font-weight: ${fontWeights.normal};
  line-height: 24px;
  cursor: pointer;
`

interface IServerSearchProps {}

const ServerSearch = (props: IServerSearchProps) => (
  <SearchBar>
    <SearchBarButton>Search for a server or channel</SearchBarButton>
  </SearchBar>
)
export default ServerSearch
