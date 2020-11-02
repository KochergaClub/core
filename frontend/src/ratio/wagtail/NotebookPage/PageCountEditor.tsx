import React, { useContext } from 'react';

import styled from 'styled-components';

import { Button } from '~/frontkit';

import PrintContext from './PrintContext';

const Container = styled.div`
  position: fixed;
  top: 10px;
  right: 10px;
  background-color: yellow;

  @media print {
    display: none;
  }
`;

interface Props {
  setPageCount: (c: number) => void;
}

const PageCountEditor: React.FC<Props> = ({ setPageCount }) => {
  const printContext = useContext(PrintContext);

  const cb = () => {
    const n = window.prompt('Число страниц?');
    if (!n) {
      return;
    }
    setPageCount(parseInt(n) || 0);
  };

  return (
    <Container>
      <div>{printContext.page.count} страниц</div>
      <Button onClick={cb}>Настроить число страниц</Button>
    </Container>
  );
};

export default PageCountEditor;
