import React from 'react';

import TildaMenu from './TildaMenu';
import TildaFooter from './TildaFooter';
import ErrorBoundary from './ErrorBoundary';

import PageTitle from './PageTitle';
import Main from './Main';

import Head from 'next/head';

import { GlobalStyle, GlobalFonts } from '@kocherga/frontkit';

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
      <Head>
        <title>{title}</title>
        <link rel="stylesheet" href="/static/normalize.css" />
        <link rel="shortcut icon" href="/static/favicon.ico" />
        <GlobalFonts />
      </Head>
      {noMenu || <TildaMenu team={team || false} />}
      <ErrorBoundary>{children}</ErrorBoundary>
      {noFooter || <TildaFooter />}
    </div>
  );
};

Page.Title = PageTitle;
Page.Main = Main;

export default Page;
