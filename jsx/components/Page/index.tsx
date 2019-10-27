import React from 'react';

import { useRouter } from 'next/router';

import {
  GoogleAnalyticsScript,
  FacebookPixelScript,
  YandexMetrikaScript,
  VkRetargetingScript,
} from '~/components/analytics';

import GlobalStyle from './GlobalStyle';

import ErrorBoundary from './ErrorBoundary';

import PageTitle from './PageTitle';
import Main from './Main';
import HtmlHead from './HtmlHead';

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
  noAnalytics?: boolean; // used on /auth/magic-link page to avoid leaking tokens to analytics
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
  noAnalytics,
  og,
}) => {
  const router = useRouter();
  return (
    <div>
      <HtmlHead
        title={title}
        description={description}
        og={og || {}}
        url={router.pathname}
      />
      {noAnalytics || (
        <React.Fragment>
          <GoogleAnalyticsScript />
          <FacebookPixelScript />
          <YandexMetrikaScript />
          <VkRetargetingScript />
        </React.Fragment>
      )}
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
