import React from 'react';

import TildaMenu from './TildaMenu';
import TildaFooter from './TildaFooter';
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
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
  }

  ul, ol {
    padding-left: 40px;
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
  noFooter?: boolean;
  wide?: boolean;
}

const Page = ({ title, team, children, noMenu, noFooter, wide }: Props) => {
  return (
    <div>
      <GlobalStyle />
      {/* https://github.com/nfl/react-helmet/issues/373 */}
      <Helmet title={title} meta={[{ name: 'charSet', content: 'utf-8' }]} />
      {noMenu || <TildaMenu team={team || false} />}
      <Main wide={wide}>
        <ErrorBoundary>{children}</ErrorBoundary>
      </Main>
      {noFooter || <TildaFooter />}
    </div>
  );
};

export default Page;
