import React from 'react';

import { useRouter } from 'next/router';
import Head from 'next/head';

import { GlobalStyle } from '@kocherga/frontkit';

import ErrorBoundary from './ErrorBoundary';

import PageTitle from './PageTitle';
import Main from './Main';
import MetaTags from './MetaTags';

import TildaMenu from './TildaMenu';
import TildaFooter from './TildaFooter';
import NProgressStyle from './NProgressStyle';

import VkMessagesWidget from './VkMessagesWidget';

import { OpenGraph } from './types';

interface Props {
  title: string;
  description?: string;
  team?: boolean;
  children: React.ReactNode;
  noMenu?: boolean;
  noFooter?: boolean;
  og?: OpenGraph;
}

type PageType = React.FC<Props> & {
  Title: typeof PageTitle;
  Main: typeof Main;
};

const Page: PageType = ({
  title,
  description,
  team,
  children,
  noMenu,
  noFooter,
  og,
}) => {
  const router = useRouter();
  return (
    <div>
      <Head>
        <MetaTags
          title={title}
          description={description}
          og={og || {}}
          url={router.pathname}
        />
        <link rel="stylesheet" href="/static/normalize.css" />
        <link rel="shortcut icon" href="/static/favicon.ico" />
        {/* NOTE - <GlobalFonts /> doesn't work for some reason */}
        <link
          href="https://fonts.googleapis.com/css?family=Roboto:400,400i,500,500i,700,700i&display=block&subset=cyrillic"
          rel="stylesheet"
        />
      </Head>
      <GlobalStyle />
      <NProgressStyle />
      {noMenu || <TildaMenu team={team || false} />}
      <ErrorBoundary>{children}</ErrorBoundary>
      {noFooter || <TildaFooter />}
      {!team && <VkMessagesWidget />}
    </div>
  );
};

Page.Title = PageTitle;
Page.Main = Main;

export default Page;
