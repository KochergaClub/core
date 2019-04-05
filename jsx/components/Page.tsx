import React from 'react';

import TildaMenu from './TildaMenu';

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
  csrfToken?: string;
}

export const CSRFTokenContext = React.createContext<string | null>(null);

const Page = ({ title, team, children, noMenu, csrfToken }: Props) => {
  return (
    <CSRFTokenContext.Provider value={csrfToken}>
      <div>
        <GlobalStyle />
        <Helmet>
          <meta charSet="utf-8" />
          <title>{title}</title>
        </Helmet>
        {noMenu || <TildaMenu team={team} />}
        <Main>{children}</Main>
      </div>
    </CSRFTokenContext.Provider>
  );
};

export default Page;
