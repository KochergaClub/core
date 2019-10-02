import React from 'react';

import { NextPage } from '~/common/types';
import { API } from '~/common/api';

import { WagtailPageProps } from '~/wagtail/types';

import BlockBasedPage from '~/wagtail/pages/BlockBasedPage';

// TODO - async load or other trick to reduce the bundle size for wagtail pages
import * as RatioPages from '~/ratio/wagtail';
import * as BlogPages from '~/blog/wagtail';
import * as ProjectsPages from '~/projects/wagtail';

import { selectAPI } from '~/core/selectors';

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

const getWagtailPreviewPage = async (
  api: API,
  token: string
): Promise<WagtailPageProps> => {
  const wagtailPage = (await api.callWagtail(
    `page_preview/find/?token=${token}`
  )) as WagtailPageProps;

  return wagtailPage;
};

const getWagtailPageId = async (api: API, path: string): Promise<number> => {
  const locateResult = await api.callWagtail(`pages/locate/?html_path=${path}`);
  return locateResult.id as number;
};

const getWagtailPage = async (
  api: API,
  pageId: number
): Promise<WagtailPageProps> => {
  const wagtailPage = (await api.callWagtail(
    `pages/${pageId}/?fields=*`
  )) as WagtailPageProps;

  return wagtailPage;
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
    const wagtailPageId = await getWagtailPageId(api, asPath);
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
