import React from 'react';
import ReactDOMServer from 'react-dom/server';

import { ServerStyleSheet } from 'styled-components';
import { Helmet, HelmetData } from 'react-helmet';

import Entrypoint from '~/entry';
import { findBasicScreen } from '~/screens';
import { AnyScreen, GlobalContextShape } from '~/common/types';

export interface RawRenderResult {
  html: string;
  helmet: HelmetData;
  styleTags: string;
}

export interface RenderResult extends RawRenderResult {
  props: any;
  screenName: string;
}

export function renderEntrypoint<T>(
  screen: AnyScreen<any, T>,
  context: GlobalContextShape,
  props: T
): RawRenderResult {
  const el = (
    <Entrypoint<T>
      screen={screen}
      csrfToken={context.api.csrfToken}
      user={context.user}
      innerProps={props}
      store={context.store}
    />
  );

  const sheet = new ServerStyleSheet();
  const html = ReactDOMServer.renderToString(sheet.collectStyles(el));
  const helmet = Helmet.renderStatic();
  const styleTags = sheet.getStyleTags();

  return { html, styleTags, helmet };
}

export const renderEntrypointWithData = async (
  screenName: string,
  context: GlobalContextShape,
  reqParams: { [k: string]: string },
  reqQuery: { [k: string]: string }
): Promise<RenderResult> => {
  const screen = findBasicScreen(screenName);

  let props = {};
  if (screen.getInitialData) {
    props = await screen.getInitialData(context, {
      params: reqParams,
      query: reqQuery,
    });
  }

  return {
    ...renderEntrypoint(screen, context, props),
    screenName,
    props,
  };
};

export const getGAScript = (
  id: string
) => `<script async src="https://www.googletagmanager.com/gtag/js?id=${id}"></script>
<script>
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${id}');
</script>
`;
