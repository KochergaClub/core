import React from 'react';

import Router from 'next/router';

import { IS_SERVER } from '~/common/utils';

const fetch = IS_SERVER ? require('node-fetch').default : window.fetch;

import { NextPage } from '~/common/types';
import { API, APIError } from '~/common/api';

import { AnyPageType, WagtailPageType } from '~/wagtail/pages/types';

import BlockBasedScreen from '~/wagtail/pages/BlockBasedPage';
import RatioSectionIndexScreen from '~/wagtail/pages/RatioSectionIndexPage';
import RatioSectionScreen from '~/wagtail/pages/RatioSectionPage';
import RatioNotebookScreen from '~/wagtail/pages/RatioNotebookPage';
import BlogPostScreen from '~/wagtail/pages/BlogPostPage';
import BlogIndexScreen from '~/wagtail/pages/BlogIndexPage';

import { selectAPI } from '~/core/selectors';

const getWagtailScreen = (meta_type: string) => {
  switch (meta_type) {
    case 'pages.FreeFormPage':
    case 'pages.FrontPage':
      return BlockBasedScreen;
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
): Promise<AnyPageType> => {
  const wagtailPage = (await api.callWagtail(
    `page_preview/find/?token=${token}`
  )) as AnyPageType;

  return wagtailPage;
};

const getWagtailPageId = async (api: API, path: string): Promise<number> => {
  // FIXME: copy-pasted from api.ts
  const findResponse = await fetch(
    `${api.base}/api/wagtail/pages/find/?html_path=${path}`,
    {
      method: 'GET',
      headers: api.getHeaders(),
      redirect: 'manual',
    }
  );
  if (findResponse.status === 404) {
    throw new APIError('Page not found', 404);
  } else if (findResponse.status !== 302) {
    throw new Error('Expected redirect, got status ' + findResponse.status);
  }

  const wagtailUrl = findResponse.headers.get('location') || '';
  console.log(`Got wagtail page ${wagtailUrl}`);

  const match = wagtailUrl.match(/(\d+)\/?$/);
  if (!match) {
    throw new Error('Unparsable redirected url');
  }
  const pageId = match[1];

  return pageId;
};

const getWagtailPage = async (
  api: API,
  pageId: number
): Promise<AnyPageType> => {
  const wagtailPage = (await api.callWagtail(
    `pages/${pageId}/?fields=*`
  )) as AnyPageType;

  return wagtailPage;
};

ProxyWagtailPage.getInitialProps = async context => {
  const {
    asPath,
    query,
    store: { getState },
    res,
  } = context;

  const api = selectAPI(getState());

  if (!asPath) {
    throw new Error('asPath is empty');
  }

  console.log(asPath);

  let wagtailPage: AnyPageType;
  if (asPath.startsWith('/preview?')) {
    if (!query.token) {
      throw new Error("Can't preview without token");
    }
    wagtailPage = await getWagtailPreviewPage(api, query.token as string);
  } else {
    // first, let's check that page exists
    const wagtailPageId = await getWagtailPageId(api, asPath);

    if (!asPath.endsWith('/')) {
      // FIXME - check for query string
      // wait, the page url is not normalized properly
      const redirectUrl = asPath + '/';
      if (res) {
        res.writeHead(302, {
          Location: redirectUrl,
        });
        res.end();
      } else {
        Router.push(redirectUrl);
      }
      return;
    }

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
