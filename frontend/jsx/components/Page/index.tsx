import React from 'react';
import styled from 'styled-components';

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
  chrome?: 'default' | 'none' | 'fullscreen';
  noVkWidget?: boolean;
  noAnalytics?: boolean; // used on /auth/magic-link page to avoid leaking tokens to analytics
  og?: OpenGraph;
}

type PageType = React.FC<Props> & {
  Title: typeof PageTitle;
  Main: typeof Main;
};

const FullScreenContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const FullScreenContainerInner = styled.div`
  flex: 1;
  overflow: scroll;
`;

const Whitespace = styled.div`
  height: 80px;
`;

const Page: PageType = props => {
  const router = useRouter();

  const renderContent = () => {
    const chrome = props.chrome || 'default';
    const showMenu = chrome !== 'none';
    const showFooter = chrome === 'default';
    const showWhitespace = chrome !== 'fullscreen';

    const menu = showMenu ? <TildaMenu team={props.team || false} /> : null;
    const footer = showFooter ? <TildaFooter /> : null;
    const body = <ErrorBoundary>{props.children}</ErrorBoundary>;

    if (chrome === 'fullscreen') {
      return (
        <FullScreenContainer>
          {menu}
          <FullScreenContainerInner>{body}</FullScreenContainerInner>
        </FullScreenContainer>
      );
    }

    return (
      <React.Fragment>
        {menu}
        {body}
        {showWhitespace && <Whitespace />}
        {footer}
      </React.Fragment>
    );
  };

  return (
    <div>
      <HtmlHead
        title={props.title}
        description={props.description}
        og={props.og || {}}
        url={router.pathname}
      />
      {props.noAnalytics || (
        <React.Fragment>
          <GoogleAnalyticsScript />
          <FacebookPixelScript />
          <YandexMetrikaScript />
          <VkRetargetingScript />
        </React.Fragment>
      )}
      <GlobalStyle />
      <NProgressStyle />
      {renderContent()}
      {!props.team && !props.noVkWidget && <VkMessagesWidget />}
    </div>
  );
};

Page.Title = PageTitle;
Page.Main = Main;

export default Page;
