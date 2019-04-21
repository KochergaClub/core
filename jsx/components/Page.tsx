import React from 'react';

import TildaMenu from './TildaMenu';
import ErrorBoundary from './ErrorBoundary';

import { Helmet } from 'react-helmet';

import { createGlobalStyle } from 'styled-components';

import Main from './Main';

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
    -webkit-font-smoothing: antialiased;
  }

  p {
    margin: 16px 0;
  }

  h2, h3, h4 {
    margin: 16px 0;
  }
`;

interface Props {
  title: string;
  team?: boolean;
  children: React.ReactNode;
  noMenu?: boolean;
}

const Page = ({ title, team, children, noMenu }: Props) => {
  return (
    <div>
      <GlobalStyle />
      {/* https://github.com/nfl/react-helmet/issues/373 */}
      <Helmet title={title} meta={[{ name: 'charSet', content: 'utf-8' }]} />
      {noMenu || <TildaMenu team={team || false} />}
      <Main>
        <ErrorBoundary>{children}</ErrorBoundary>
      </Main>
    </div>
  );
};

export default Page;
