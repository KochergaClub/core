import express from 'express';

import React from 'react';

import ReactDOMServer from 'react-dom/server';

import { StaticRouter } from 'react-router';
import { ServerStyleSheet } from 'styled-components';
import { Helmet, HelmetData } from 'react-helmet';

import { GlobalFontsString } from '@kocherga/frontkit';

import Entrypoint from '~/navigation/Entrypoint';

import { PageInfo, RenderContext, buildRenderContext } from '../types';

const webpackStats = require('~/../webpack-stats.json');

export interface RenderResult {
  html: string;
  helmet: HelmetData;
  styleTags: string;
}

const getGAScript = (
  id: string
) => `<script async src="https://www.googletagmanager.com/gtag/js?id=${id}"></script>
<script>
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${id}');
</script>
`;

export const sendFullHtml = (
  renderResult: RenderResult,
  renderContext: RenderContext,
  _: express.Request,
  res: express.Response
) => {
  const { html, styleTags, helmet } = renderResult;

  const google_analytics_id = process.env.GOOGLE_ANALYTICS_ID;

  let bundleSrc = webpackStats.publicPath + webpackStats.chunks.main[0].name;
  if (process.env.NODE_ENV === 'development') {
    // use webpack-dev-server in dev
    bundleSrc = 'http://localhost:8080' + bundleSrc;
  }

  const htmlTemplate = `<!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="/static/normalize.css">
        <link rel="shortcut icon" href="/static/favicon.ico">

        ${helmet.title.toString()}
        ${helmet.meta.toString()}
        ${helmet.link.toString()}

        ${GlobalFontsString}
        ${google_analytics_id ? getGAScript(google_analytics_id) : ''}
        ${styleTags}
      </head>
      <body>
        <div id="react-app">${html}</div>
        <script>
        // Info stored for app re-rendering
        var RENDER_CONTEXT = ${JSON.stringify(renderContext)};
        </script>

        <script type="text/javascript" src="${bundleSrc}"></script>
      </body>
    </html>
    `;

  res.send(htmlTemplate);
};

export const renderReactElement = (el: JSX.Element): RenderResult => {
  const sheet = new ServerStyleSheet();
  const html = ReactDOMServer.renderToString(sheet.collectStyles(el));
  const helmet = Helmet.renderStatic();
  const styleTags = sheet.getStyleTags();

  return { html, styleTags, helmet };
};

export const sendEntrypointHtml = (
  pageInfo: PageInfo,
  req: express.Request,
  res: express.Response
) => {
  const routerContext: { url?: string } = {};

  const renderContext = buildRenderContext(pageInfo, req.reactContext);

  const el = (
    <StaticRouter location={req.url} context={routerContext}>
      <Entrypoint
        store={req.reactContext.store}
        renderContext={renderContext}
      />
    </StaticRouter>
  );

  const renderResult = renderReactElement(el);

  if (routerContext.url) {
    res.redirect(302, routerContext.url);
    return;
  }

  sendFullHtml(renderResult, renderContext, req, res);
};
