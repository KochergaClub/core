import React from 'react';

import { NextPage } from '~/common/types';

import { WagtailPageProps } from '~/wagtail/types';

import BlockBasedPage from '~/wagtail/wagtail/BlockBasedPage';

// TODO - async load or other trick to reduce the bundle size for wagtail pages
import * as RatioPages from '~/ratio/wagtail';
import * as BlogPages from '~/blog/wagtail';
import * as ProjectsPages from '~/projects/wagtail';
import * as FAQPages from '~/faq/wagtail';

import { selectAPI } from '~/core/selectors';

import {
  getWagtailPreviewPage,
  getWagtailPageId,
  getWagtailPage,
} from '../utils';

const getWagtailScreen = (meta_type: string) => {
  switch (meta_type) {
    case 'pages.FreeFormPage':
    case 'pages.FrontPage':
      return BlockBasedPage;

    case 'ratio.SectionIndexPage':
      return RatioPages.SectionIndexPage;
    case 'ratio.SectionPage':
      return RatioPages.SectionPage;
    case 'ratio.NotebookPage':
      return RatioPages.NotebookPage;

    case 'blog.BlogPostPage':
      return BlogPages.BlogPostPage;
    case 'blog.BlogIndexPage':
      return BlogPages.BlogIndexPage;

    case 'projects.ProjectPage':
      return ProjectsPages.ProjectPage;
    case 'projects.ProjectIndexPage':
      return ProjectsPages.ProjectIndexPage;

    case 'faq.FAQPage':
      return FAQPages.FAQPage;

    default:
      return null;
  }
};

const UnknownPage = (props: WagtailPageProps) => (
  <div>
    <h1>
      Unknown Wagtail page type: <code>{props.meta.type}</code>
    </h1>
    <pre>{JSON.stringify(props, null, 2)}</pre>
  </div>
);

// FIXME!
type ProxyProps = any; // eslint-disable-line @typescript-eslint/no-explicit-any

const ProxyWagtailPage: NextPage<ProxyProps> = props => {
  const WagtailScreen = getWagtailScreen(props.wagtailPage.meta_type);
  if (!WagtailScreen) {
    return <UnknownPage {...props.wagtailPage} />;
  }

  return <WagtailScreen {...props} />;
};

ProxyWagtailPage.getInitialProps = async context => {
  const {
    asPath,
    query,
    store: { getState },
  } = context;

  const api = selectAPI(getState());

  if (!asPath) {
    throw new Error('asPath is empty');
  }

  let wagtailPage: WagtailPageProps;
  if (asPath.startsWith('/preview?')) {
    if (!query.token) {
      throw new Error("Can't preview without token");
    }
    wagtailPage = await getWagtailPreviewPage(api, query.token as string);
  } else {
    const asPathWithoutQuery = asPath.split('?')[0];

    const wagtailPageId = await getWagtailPageId(api, asPathWithoutQuery);
    wagtailPage = await getWagtailPage(api, wagtailPageId);
  }

  wagtailPage.meta_type = wagtailPage.meta.type;

  const wagtailScreen = getWagtailScreen(wagtailPage.meta_type);
  if (!wagtailScreen) {
    return { wagtailPage };
  }

  if (!wagtailScreen.getInitialProps) {
    return { wagtailPage };
  }
  const extraProps = await wagtailScreen.getInitialProps({
    ...context,
    wagtailPage: wagtailPage as any,
  });

  return { wagtailPage, ...extraProps };
};

export default ProxyWagtailPage;
