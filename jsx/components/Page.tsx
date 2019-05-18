import React from 'react';

import TildaMenu from './TildaMenu';
import TildaFooter from './TildaFooter';
import ErrorBoundary from './ErrorBoundary';

import PageTitle from './PageTitle';
import Main from './Main';

import { Helmet } from 'react-helmet';

import { GlobalStyle } from '@kocherga/frontkit';

interface Props {
  title: string;
  team?: boolean;
  children: React.ReactNode;
  noMenu?: boolean;
  noFooter?: boolean;
}

const Page = ({ title, team, children, noMenu, noFooter }: Props) => {
  return (
    <div>
      <GlobalStyle />
      {/* https://github.com/nfl/react-helmet/issues/373 */}
      <Helmet title={title} meta={[{ name: 'charSet', content: 'utf-8' }]} />
      {noMenu || <TildaMenu team={team || false} />}
      <ErrorBoundary>{children}</ErrorBoundary>
      {noFooter || <TildaFooter />}
    </div>
  );
};

Page.Title = PageTitle;
Page.Main = Main;

export default Page;
