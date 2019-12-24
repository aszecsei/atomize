import * as React from 'react'

import styled from '@emotion/styled'
import { themeValues } from '../../theme'
import { unselectable } from '../utils'

const ModalBackground = styled.div`
  display: block;
  position: fixed;
  z-index: 1000;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: none;
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.8); /* Black w/ opacity */
  display: flex;
`

const ModalContent = styled.div`
  background-color: ${themeValues.backgroundSecondary};
  margin: auto;
  padding: 20px;
  border: 1px solid ${themeValues.backgroundModifierAccent};
  min-width: 40%;
  max-width: 60%;
  border-radius: 4px;
  box-shadow: ${themeValues.elevationHigh};
  color: ${themeValues.textNormal};
`

const ModalTitle = styled.h2`
  margin: 0;
`

const ModalHeader = styled.div`
  display: flex;
  margin-bottom: 10px;
`

const ModalBody = styled.div``

const CloseBtn = styled.span`
  margin-left: auto;
  color: ${themeValues.headerSecondary};
  font-size: 28px;
  font-weight: bold;
  &:hover,
  &:focus {
    color: ${themeValues.headerPrimary};
    cursor: pointer;
  }
  ${unselectable};
`

interface IModalProps {
  open?: boolean
  onClose?: () => void
  title?: string
}

const Modal: React.FunctionComponent<IModalProps> = ({
  children,
  open,
  onClose,
  title,
}) => {
  if (!open) {
    return <></>
  } else {
    return (
      <ModalBackground onClick={onClose}>
        <ModalContent onClick={e => e.stopPropagation()}>
          <ModalHeader>
            {title ? <ModalTitle>{title}</ModalTitle> : null}
            <CloseBtn onClick={onClose}>&times;</CloseBtn>
          </ModalHeader>
          <ModalBody>{children}</ModalBody>
        </ModalContent>
      </ModalBackground>
    )
  }
}

export default Modal
