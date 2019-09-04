import React from 'react';

import { useRouter } from 'next/router';
import Head from 'next/head';

import GlobalStyle from './GlobalStyle';

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
  noVkWidget?: boolean;
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
  noVkWidget,
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
        <link rel="shortcut icon" href="/static/favicon.ico" />
      </Head>
      <GlobalStyle />
      <NProgressStyle />
      {noMenu || <TildaMenu team={team || false} />}
      <ErrorBoundary>{children}</ErrorBoundary>
      {noFooter || <TildaFooter />}
      {!team && !noVkWidget && <VkMessagesWidget />}
    </div>
  );
};

Page.Title = PageTitle;
Page.Main = Main;

export default Page;
