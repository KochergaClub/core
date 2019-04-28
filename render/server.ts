process.env.TZ = 'Europe/Moscow';

const argv = require('yargs')
  .option('p', {
    alias: 'port',
    description: "Specify the server's port",
    default: 80,
  })
  .option('a', {
    alias: 'address',
    description: "Specify the server's address",
    default: '0.0.0.0',
  })
  .help('h')
  .alias('h', 'help')
  .strict().argv;

import http from 'http';
import express from 'express';
import slash from 'express-slash';
import bodyParser from 'body-parser';
import httpProxy from 'http-proxy';

import React from 'react';
import ReactDOMServer from 'react-dom/server';
import 'babel-polyfill';

import { ServerStyleSheet } from 'styled-components';
import { Helmet } from 'react-helmet';

import Entrypoint, { requestParamsToPageProps } from '../jsx/entry';
import { API } from '../jsx/utils';

import webpackStats from '../webpack-stats.json';

const ADDRESS = argv.address;
const PORT = argv.port;

const app = express();

app.enable('strict routing');
app.disable('x-powered-by');

app.use(bodyParser.json({ limit: '2mb' }));

function render(path: string, props: any) {
  const sheet = new ServerStyleSheet();

  const el = React.createElement(Entrypoint, {
    name: path,
    csrfToken: props.csrf_token,
    innerProps: props,
  });

  const html = ReactDOMServer.renderToString(sheet.collectStyles(el));
  const helmet = Helmet.renderStatic();
  const styleTags = sheet.getStyleTags();

  return { html, styleTags, helmet };
}

const getCb = (pageName: string) => async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const csrfToken = 'TODO'; // FIXME - get from django somehow
    const api = new API(csrfToken, 'http://api');

    const google_analytics_id = 'GOOGLE_TODO'; // FIXME
    const webpackDevServer = true; // FIXME

    const props = await requestParamsToPageProps(pageName, api, req.params);
    const { html, styleTags, helmet } = render(pageName, props);

    let bundleSrc = webpackStats.publicPath + webpackStats.chunks.main[0].name;
    if (webpackDevServer) {
      bundleSrc = 'http://localhost:8080' + bundleSrc;
    }

    const store = {
      component: pageName,
      props: {
        ...props,
        csrf_token: csrfToken,
      },
    };

    const htmlTemplate = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="/static/normalize.css">
        <link rel="shortcut icon" href="/static/favicon.ico">

        ${helmet.title.toString()}
        ${helmet.meta.toString()}
        ${helmet.link.toString()}

        ${google_analytics_id &&
          `
            <script async src="https://www.googletagmanager.com/gtag/js?id=${google_analytics_id}"></script>
            <script>
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${google_analytics_id}');
            </script>
          `}
      </head>
      <body>
        ${styleTags}
        <div id="react-app">${html}</div>
        <script>
        // Info stored for re-rendering the app
        var store = ${JSON.stringify(store)};
        var csrfToken = "${csrfToken}";
        </script>

        <script type="text/javascript" src="${bundleSrc}"></script>
      </body>
    </html>
    `;

    res.send(htmlTemplate);
  } catch (err) {
    next(err);
  }
};

app.get('/projects', getCb('projects/index'));
app.get('/projects/:name', getCb('projects/detail'));
app.get('/team/staff', getCb('staff/index_page'));
app.get('/team/staff/:id', getCb('staff/member_page'));

const proxy = httpProxy.createProxyServer({
  target: 'http://api',
});

app.get(/\/(?:api|static|media|wagtail|admin)(?:$|\/)/, (req, res) => {
  proxy.web(req, res);
});

app.use(slash());

const server = new http.Server(app);
server.listen(PORT, ADDRESS, () => {
  console.log(`React render server listening at http://${ADDRESS}:${PORT}`);
});
