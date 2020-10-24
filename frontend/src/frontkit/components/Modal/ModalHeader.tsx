import * as React from 'react';

import styled from 'styled-components';

import * as colors from '../../colors';

const ModalHeaderEl = styled.header`
  padding: 6px 10px;
  border-bottom: 1px solid ${colors.grey[200]};
  font-weight: bold;
`;

export interface Props {
  toggle?: () => void;
  children: React.ReactNode;
}

const HeaderButton = styled.button`
  float: right;
  border: none;
  background: none;
  padding: 0 2px;
  cursor: pointer;
  font-weight: bold;
  font-size: 16px;
  color: #333;
  &:hover {
    color: red;
  }
`;

const ModalHeader = (props: Props) => {
  return (
    <ModalHeaderEl>
      {props.children}
      {props.toggle && (
        <HeaderButton onClick={() => props.toggle!()}>×</HeaderButton>
      )}
    </ModalHeaderEl>
  );
};

export default ModalHeader;
