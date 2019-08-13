import React from 'react';

import Router from 'next/router';

import { IS_SERVER } from '~/common/utils';

const fetch = IS_SERVER ? require('node-fetch').default : window.fetch;

import { NextPage } from '~/common/types';

import { AnyPageType, WagtailPageType } from '~/wagtail/pages/types';

import FreeFormScreen from '~/wagtail/pages/FreeFormPage';
import RatioSectionIndexScreen from '~/wagtail/pages/RatioSectionIndexPage';
import RatioSectionScreen from '~/wagtail/pages/RatioSectionPage';
import RatioNotebookScreen from '~/wagtail/pages/RatioNotebookPage';
import BlogPostScreen from '~/wagtail/pages/BlogPostPage';
import BlogIndexScreen from '~/wagtail/pages/BlogIndexPage';

import { selectAPI } from '~/core/selectors';

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
    store: { getState },
    res,
  } = context;

  const api = selectAPI(getState());

  if (!asPath) {
    throw new Error('asPath is empty');
  }

  // FIXME: copy-pasted from api.ts
  const findResponse = await fetch(
    `${api.base}/api/wagtail/pages/find/?html_path=${asPath}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': api.csrfToken,
        'X-Forwarded-Host': api.realHost,
      },
      redirect: 'manual',
    }
  );
  if (findResponse.status !== 302) {
    throw new Error('Expected redirect, got status ' + findResponse.status);
  }

  const wagtailUrl = findResponse.headers.get('location') || '';
  console.log(`Got wagtail page ${wagtailUrl}`);

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

  const match = wagtailUrl.match(/(\d+)\/?$/);
  if (!match) {
    throw new Error('Unparsable redirected url');
  }
  const pageId = match[1];

  const wagtailPage = (await api.callWagtail(
    `pages/${pageId}/?fields=*`
  )) as AnyPageType;
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
