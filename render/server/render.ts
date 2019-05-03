import * as React from 'react';
import ReactDOMServer from 'react-dom/server';

import { ServerStyleSheet } from 'styled-components';
import { Helmet, HelmetData } from 'react-helmet';

import Entrypoint, { requestToPageProps } from '../../jsx/entry';
import { GlobalContextShape } from '../../jsx/common/types';

export interface RenderResult {
  html: string;
  helmet: HelmetData;
  styleTags: string;
  props: any;
  screenName: string;
}

export const renderEntrypoint = (
  screenName: string,
  context: GlobalContextShape,
  props: object
): RenderResult => {
  const el = React.createElement(Entrypoint, {
    screenName,
    csrfToken: context.api.csrfToken,
    innerProps: props,
  });

  const sheet = new ServerStyleSheet();
  const html = ReactDOMServer.renderToString(sheet.collectStyles(el));
  const helmet = Helmet.renderStatic();
  const styleTags = sheet.getStyleTags();

  return { html, styleTags, helmet, props, screenName };
};

export const renderEntrypointWithData = async (
  screenName: string,
  context: GlobalContextShape,
  reqParams: object,
  reqQuery: object
): Promise<RenderResult> => {
  const props = await requestToPageProps(
    screenName,
    context,
    reqParams,
    reqQuery
  );

  return renderEntrypoint(screenName, context, props);
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
