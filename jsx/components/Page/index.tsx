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
  children: React.ReactNode;
  noMenu?: boolean;
  noFooter?: boolean;
  fullScreen?: boolean;
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

const Page: PageType = props => {
  const router = useRouter();

  const renderContent = () => {
    const menu = props.noMenu ? null : <TildaMenu team={props.team || false} />;
    const footer = props.noFooter ? null : <TildaFooter />;
    const body = <ErrorBoundary>{props.children}</ErrorBoundary>;

    if (props.fullScreen) {
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
