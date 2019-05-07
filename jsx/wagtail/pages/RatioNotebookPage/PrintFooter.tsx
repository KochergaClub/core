import React, { useContext } from 'react';

import styled from 'styled-components';

import PrintContext from './PrintContext';

const Container = styled.div`
  display: none;
  @media print {
    display: block;
  }
`;

const Footer = styled.footer`
  position: absolute;
  width: 100%;
  text-align: right;
  padding-right: 8mm;
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
        console.log(top);
        return (
          <Footer
            key={pageNumber}
            style={{
              top: `${top}mm`,
            }}
          >
            {pageNumber} / {printContext.page.count}
          </Footer>
        );
      })}
    </Container>
  );
}
