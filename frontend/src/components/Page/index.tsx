import styled from 'styled-components';

import {
    FacebookPixelScript, GoogleAnalyticsScript, VkRetargetingScript, YandexMetrikaScript
} from '~/components/analytics';
import { WithToaster } from '~/frontkit';

import ErrorBoundary from './ErrorBoundary';
import GlobalStyle from './GlobalStyle';
import HtmlHead from './HtmlHead';
import Main from './Main';
import NProgressStyle from './NProgressStyle';
import { PageFooter } from './PageFooter';
import PageMenu from './PageMenu';
import PageTitle from './PageTitle';
import { MenuKind, OpenGraph } from './types';
import VkMessagesWidget from './VkMessagesWidget';

interface Props {
  title: string;
  description?: string;
  menu?: MenuKind;
  chrome?: 'default' | 'none' | 'fullscreen';
  vkWidget?: boolean;
  noAnalytics?: boolean; // used on /auth/magic-link page to avoid leaking tokens to analytics
  noWhitespace?: boolean; // useful e.g. for /now page where we don't want a white whitespace, especially in black tv mode
  og?: OpenGraph;
  vkImage?: string; // link for vk:image tag
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
  overflow: auto;
`;

const Whitespace = styled.div`
  height: 80px;
`;

const Page: PageType = (props) => {
  const renderContent = () => {
    const chrome = props.chrome || 'default';
    const showMenu = chrome !== 'none';
    const showFooter = chrome === 'default';
    const showWhitespace = chrome !== 'fullscreen' && !props.noWhitespace;

    const menuKind = props.menu || 'public';

    const menuEl = showMenu ? <PageMenu kind={menuKind} /> : null;
    const footerEl = showFooter ? <PageFooter /> : null;

    if (chrome === 'fullscreen') {
      return (
        <FullScreenContainer>
          {menuEl}
          <FullScreenContainerInner>{props.children}</FullScreenContainerInner>
        </FullScreenContainer>
      );
    }

    return (
      <>
        {menuEl}
        {props.children}
        {showWhitespace && <Whitespace />}
        {footerEl}
      </>
    );
  };

  return (
    <div>
      <HtmlHead
        title={props.title}
        description={props.description}
        og={props.og || {}}
        vkImage={props.vkImage}
        canonicalUrl={props.canonicalUrl}
      />
      {props.noAnalytics || (
        <>
          <GoogleAnalyticsScript />
          <FacebookPixelScript />
          <YandexMetrikaScript />
          <VkRetargetingScript />
        </>
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
