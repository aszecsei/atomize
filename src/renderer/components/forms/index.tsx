import * as React from 'react'
import styled from '@emotion/styled'
import { themeValues, fontWeights } from '../../theme'
import { css } from '@emotion/core'
import { unselectable } from '../utils'

export { Button, ButtonGroup } from './buttons'

export const Form = styled.form`
  display: flex;
  flex-direction: column;
`

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
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const Control = styled.label`
  box-sizing: border-box;
  clear: both;
  font-size: 1rem;
  position: relative;
  text-align: left;
  justify-content: space-between;
  display: flex;
  flex-direction: row;
  flex: 1 1 auto;
  align-items: center;
  margin-bottom: 10px;
  padding: 0 40px;
  width: 100%;
`

export const Label = styled.h5`
  &:not(:last-child) {
    margin-bottom: 0.5em;
  }
  color: ${themeValues.headerPrimary};
  display: inline-block;
  font-size: 1rem;
  font-weight: ${fontWeights.medium};
  align-items: center;
  flex: 1;
  ${unselectable};
  margin: 0;
  margin-right: 20px;
  margin-top: 10px;
  text-align: right;
`

export const Help = styled.p`
  display: block;
  font-size: 0.75rem;
  margin-top: 0.25rem;
`

export const Input = styled.input`
  flex: 1;
  &[type='text'] {
    padding: 10px;
    height: 40px;
    border-radius: 4px;
    box-sizing: border-box;
    font-size: 16px;
    color: #dcddde; /* TODO: extract this to a variable for a theme */
    background-color: rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(0, 0, 0, 0.3);
  }
  &[type='text']:focus {
    border: 1px solid rgb(114, 137, 218) !important;
  }
  &[type='text']:hover {
    border: 1px solid rgba(0, 0, 0, 0.7);
  }
  &[type='number'] {
    padding: 10px;
    height: 40px;
    border-radius: 4px;
    box-sizing: border-box;
    font-size: 16px;
    color: #dcddde;
    background-color: rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(0, 0, 0, 0.3);
  }
  &[type='number']:focus {
    /* TODO: extract this to variable for themes */
    border: 1px solid rgb(114, 137, 218) !important;
  }
  &[type='number']:hover {
    border: 1px solid rgba(0, 0, 0, 0.7);
  }
  &[type='number']::-webkit-inner-spin-button {
    /* This hides the arrows of the number input */
    -webkit-appearance: none;
  }
  &[type='submit'] {
    background-color: rgba(114, 137, 218, 1);
    border: 1px solid rgba(0, 0, 0, 0.3);
    border-radius: 4px;
    color: white;
    padding: 10px 20px;
    text-decoration: none;
    margin: 5px 4px;
    cursor: pointer;
  }
  &[type='submit']:focus {
    border-color: rgba(170, 200, 255, 0.7);
  }
  &[type='submit']:hover {
    background-color: rgba(105, 130, 210, 0.9);
  }
  &[type='submit']:active {
    background-color: rgba(100, 120, 200, 0.9);
  }
`

const CheckboxDiv = styled.div`
  display: inline-block;
  align-items: center;
  margin: 0;
  vertical-align: text-bottom;
  flex: 1;
  padding-right: 20px;

  input[type='checkbox'] {
    position: absolute;
    opacity: 0;
    pointer-events: none;
  }

  .md_checkbox__tick {
    position: relative;
    cursor: pointer;
  }

  .md_checkbox__tick::before {
    /* Box is Not Checked */
    content: '';
    display: block;
    margin: 0 3px;
    height: 18px;
    width: 18px;
    border: 1px rgba(0, 0, 0, 0.7) solid;
    border-radius: 4px;
    background-color: rgba(255, 255, 255, 0.1);
  }

  input[type='checkbox']:focus + .md_checkbox__tick::before {
    border: 1px solid rgb(114, 137, 218) !important;
  }

  input[type='checkbox']:checked + .md_checkbox__tick::before {
    /* Styling when Box is Checked */
    background: rgba(0, 0, 0, 0.3);
  }

  input[type='checkbox']:disabled + .md_checkbox__tick::before {
    background: #bbb; /* TODO : Theme */
    border-color: rgba(0, 0, 0, 5);
  }

  input[type='checkbox'] + .md_checkbox__tick::after {
    /* Box is Checked */
    content: '✓';
    position: absolute;
    line-height: 18px;
    text-align: center;
    color: #dcddde; /* TODO: theme */
    top: 0px;
    left: 0px;
    margin: 0 3px;
    height: 17px;
    width: 17px;
    opacity: 0;
  }

  input[type='checkbox']:checked + .md_checkbox__tick::after {
    opacity: 1;
  }
`

interface ICheckboxProps {
  checked: boolean
  onChange: () => void
}

export const Checkbox = (props: ICheckboxProps) => (
  <CheckboxDiv>
    <input checked={props.checked} onChange={props.onChange} type="checkbox" />
    <span className="md_checkbox__tick" />
  </CheckboxDiv>
)
