import React from 'react';
import styled from 'styled-components';

import {
  GoogleAnalyticsScript,
  FacebookPixelScript,
  YandexMetrikaScript,
  VkRetargetingScript,
} from '~/components/analytics';

import GlobalStyle from './GlobalStyle';

import ErrorBoundary from './ErrorBoundary';
import WithToaster from './WithToaster';

import PageTitle from './PageTitle';
import Main from './Main';
import HtmlHead from './HtmlHead';

import TildaMenu from './TildaMenu';
import TildaFooter from './TildaFooter';
import NProgressStyle from './NProgressStyle';

import VkMessagesWidget from './VkMessagesWidget';

import { OpenGraph, MenuKind } from './types';

interface Props {
  title: string;
  description?: string;
  menu?: MenuKind;
  chrome?: 'default' | 'none' | 'fullscreen';
  vkWidget?: boolean;
  noAnalytics?: boolean; // used on /auth/magic-link page to avoid leaking tokens to analytics
  noWhitespace?: boolean; // useful e.g. for /now page where we don't want a white whitespace, especially in black tv mode
  og?: OpenGraph;
  canonicalUrl?: string;
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
  const renderContent = () => {
    const chrome = props.chrome || 'default';
    const showMenu = chrome !== 'none';
    const showFooter = chrome === 'default';
    const showWhitespace = chrome !== 'fullscreen' && !props.noWhitespace;

    const menuKind = props.menu || 'public';

    const menuEl = showMenu ? <TildaMenu kind={menuKind} /> : null;
    const footerEl = showFooter ? <TildaFooter /> : null;

    if (chrome === 'fullscreen') {
      return (
        <FullScreenContainer>
          {menuEl}
          <FullScreenContainerInner>{props.children}</FullScreenContainerInner>
        </FullScreenContainer>
      );
    }

    return (
      <React.Fragment>
        {menuEl}
        {props.children}
        {showWhitespace && <Whitespace />}
        {footerEl}
      </React.Fragment>
    );
  };

  return (
    <div>
      <HtmlHead
        title={props.title}
        description={props.description}
        og={props.og || {}}
        canonicalUrl={props.canonicalUrl}
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
      <ErrorBoundary>
        <WithToaster>{renderContent()}</WithToaster>
      </ErrorBoundary>
      {props.vkWidget && <VkMessagesWidget />}
    </div>
  );
};

Page.Title = PageTitle;
Page.Main = Main;

export default Page;
