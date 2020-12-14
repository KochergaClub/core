import * as React from 'react';
import { MdClose } from 'react-icons/md';
import styled from 'styled-components';

import * as colors from '../../colors';

const ModalHeaderEl = styled.header`
  padding: 12px 20px;
  border-bottom: 1px solid ${colors.grey[200]};
  font-weight: bold;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export interface Props {
  close: () => void;
  children: React.ReactNode;
}

const HeaderButton = styled.button`
  float: right;
  border: none;
  background: none;
  padding: 0 2px;
  cursor: pointer;
  color: #333;
  &:hover {
    color: red;
  }
`;

const ModalHeader = (props: Props) => {
  return (
    <ModalHeaderEl>
      {props.children}
      {props.close && (
        <HeaderButton type="button" onClick={() => props.close()}>
          <MdClose />
        </HeaderButton>
      )}
    </ModalHeaderEl>
  );
};

export default ModalHeader;
