import React from 'react';

import { Helmet } from 'react-helmet';

import styled, { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Open Sans', Arial, sans-serif;
    font-size: 16px;
    line-height: 24px;
  }

  p {
    margin: 16px 0;
  }

  h2, h3, h4 {
    margin: 16px 0;
  }
`;

const Main = styled.main`
  max-width: 1080px;
  margin: 0 auto;
`;

const Page = ({ title, children }: { title: string, children: React.ReactNode }) => {
  return (
    <Main>
      <GlobalStyle />
      <Helmet>
        <meta charSet="utf-8" />
        <title>{title}</title>
      </Helmet>
      {children}
    </Main>
  );
};

export default Page;
