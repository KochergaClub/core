import React from 'react';

import { AnyInitialLoader, AnyScreen } from '~/common/types';
import { WagtailPageType } from './pages/types';

import FreeFormScreen from './pages/FreeFormPage';
import RatioSectionIndexScreen from './pages/RatioSectionIndexPage';
import RatioSectionScreen from './pages/RatioSectionPage';
import RatioNotebookScreen from './pages/RatioNotebookPage';
import BlogPostScreen from './pages/BlogPostPage';
import BlogIndexScreen from './pages/BlogIndexPage';

const getWagtailScreen = (meta_type: string) => {
  switch (meta_type) {
    case 'pages.FreeFormPage':
      return FreeFormScreen;
    case 'ratio.SectionIndexPage':
      return RatioSectionIndexScreen;
    case 'ratio.SectionPage':
      return RatioSectionScreen;
    case 'ratio.NotebookPage':
      return RatioNotebookScreen;
    case 'blog.BlogPostPage':
      return BlogPostScreen;
    case 'blog.BlogIndexPage':
      return BlogIndexScreen;
    default:
      return null;
  }
};

const UnknownPage = (props: WagtailPageType) => (
  <div>
    <h1>
      Unknown Wagtail page type: <code>{props.meta.type}</code>
    </h1>
    <pre>{JSON.stringify(props, null, 2)}</pre>
  </div>
);

// FIXME!
type ProxyProps = any;

const ProxyWagtailPage = (props: ProxyProps) => {
  const wagtailScreen = getWagtailScreen(props.wagtailPage.meta_type);
  if (!wagtailScreen) {
    return <UnknownPage {...props} />;
  }
  return <wagtailScreen.component {...props} />;
};

type WagtailInitialLoader = AnyInitialLoader<WagtailPageType, ProxyProps>;

const getInitialData: WagtailInitialLoader = async (
  context,
  wagtailPage: WagtailPageType
) => {
  const wagtailScreen = getWagtailScreen(wagtailPage.meta_type);
  if (!wagtailScreen) {
    return { wagtailPage };
  }

  if (!wagtailScreen.getInitialData) {
    return { wagtailPage };
  }
  const props = await wagtailScreen.getInitialData(
    context,
    wagtailPage as any // FIXME!
  );

  return props;
};

type ProxyWagtailScreen = AnyScreen<WagtailPageType, WagtailInitialLoader>;

const screen: ProxyWagtailScreen = {
  component: ProxyWagtailPage,
  getInitialData,
};

export default screen;
