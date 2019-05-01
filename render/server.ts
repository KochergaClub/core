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
import cookie from 'cookie';
import setCookie from 'set-cookie-parser';
import slash from 'express-slash';
import httpProxy from 'http-proxy';

import React from 'react';
import ReactDOMServer from 'react-dom/server';
import 'babel-polyfill';

import { ServerStyleSheet } from 'styled-components';
import { Helmet } from 'react-helmet';

import Entrypoint, { requestToPageProps } from '../jsx/entry';
import { API, APIError } from '../jsx/common/api';

import webpackStats from '../webpack-stats.json';

const ADDRESS = argv.address;
const PORT = argv.port;

const app = express();

app.enable('strict routing');
app.disable('x-powered-by');
app.use(express.urlencoded()); // form handling

//// TODO - in case we ever need body-parser again, this code breaks app.all(...) proxying to django.
//// See https://github.com/nodejitsu/node-http-proxy/issues/1142 for the details.
// import bodyParser from 'body-parser';
// app.use(bodyParser.json({ limit: '2mb' }));

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

const getAPI = (req: express.Request) => {
  const cookies = cookie.parse(req.headers.cookie || '');
  const csrfToken = cookies.csrftoken as string;

  return new API({
    csrfToken,
    base: 'http://api',
    cookie: req.get('Cookie') || '',
    realHost: req.hostname,
  });
};

const getCb = (pageName: string) => async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const api = getAPI(req);

    const google_analytics_id = process.env.GOOGLE_ANALYTICS_ID;
    const webpackDevServer = process.env.NODE_ENV === 'development';

    const props = await requestToPageProps(pageName, api, req);
    const { html, styleTags, helmet } = render(pageName, props);

    let bundleSrc = webpackStats.publicPath + webpackStats.chunks.main[0].name;
    if (webpackDevServer) {
      bundleSrc = 'http://localhost:8080' + bundleSrc;
    }

    const store = {
      component: pageName,
      props: {
        ...props,
        csrf_token: api.csrfToken,
      },
    };

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

        ${google_analytics_id ? getGAScript(google_analytics_id) : ''}
      </head>
      <body>
        ${styleTags}
        <div id="react-app">${html}</div>
        <script>
        // Info stored for re-rendering the app
        var store = ${JSON.stringify(store)};
        var csrfToken = "${api.csrfToken}";
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
app.get('/team/watchmen', getCb('watchmen/index'));

app.get('/login', async (req, res, next) => {
  try {
    const api = getAPI(req);
    const response = await api.call('me', 'GET');
    if (response.is_authenticated) {
      console.log('already authenticated');
      res.redirect(301, '/');
      return;
    }
    return getCb('auth/login')(req, res, next); // FIXME - pass next from query_params
  } catch (err) {
    next(err);
  }
});

app.post('/login', async (req, res, next) => {
  try {
    const api = getAPI(req);
    await api.call('login/send-magic-link', 'POST', {
      email: req.body.email,
      // TODO - next
    });

    res.redirect(301, '/login/check-your-email');
  } catch (err) {
    next(err);
  }
});

app.get('/login/check-your-email', getCb('auth/check-your-email'));

app.get('/login/magic-link', async (req, res, next) => {
  try {
    const api = getAPI(req);
    const response = await api.call(
      'login',
      'POST',
      {
        credentials: {
          token: req.query.token,
        },
        result: 'cookie',
      },
      false
    );

    const splitCookieHeaders = setCookie.splitCookiesString(
      response.headers.get('Set-Cookie')
    );
    if (!splitCookieHeaders.length) {
      throw new Error('Expected Set-Cookie in /api/login response');
    }
    res.set('Set-Cookie', splitCookieHeaders);

    res.redirect(301, req.query.next || '/');
  } catch (err) {
    next(err);
  }
});

const proxy = httpProxy.createProxyServer({
  target: 'http://api',
});

app.all(/\/(?:api|static|media|wagtail|admin)(?:$|\/)/, (req, res) => {
  proxy.web(req, res);
});

app.use(slash());

app.use((err, req, res, next) => {
  if (err instanceof APIError) {
    res.status(err.status).send(`Got error: ${err.status}<br>` + err.stack);
  } else {
    console.log(err);
    res.status(500).send('Something broke!');
  }
});

const server = new http.Server(app);
server.listen(PORT, ADDRESS, () => {
  console.log(`React render server listening at http://${ADDRESS}:${PORT}`);
});
