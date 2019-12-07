import React, { useContext } from 'react';

import styled from 'styled-components';

import PrintContext from './PrintContext';

const Container = styled.div`
  display: none;
  @media print {
    display: block;
  }
`;

const Footer = styled.footer<{ align: string }>`
  position: absolute;
  width: 100%;
  text-align: ${props => props.align};
  padding-right: 10mm;
  padding-left: 10mm;
`;

// this is actually a header
export default function PrintFooter() {
  const printContext = useContext(PrintContext);

  return (
    <Container>
      {Array.from(new Array(printContext.page.count)).map((_, i) => {
        const pageNumber = i + 1;
        const top =
          (printContext.page.height - printContext.page.bottomMargin) *
            (pageNumber - 1) +
          8;
        if (pageNumber <= 4) {
          return null;
        }
        return (
          <Footer
            key={pageNumber}
            style={{
              top: `${top}mm`,
            }}
            align={pageNumber % 2 ? 'right' : 'left'}
          >
            {pageNumber}
          </Footer>
        );
      })}
    </Container>
  );
}