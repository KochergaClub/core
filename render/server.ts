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
import { GlobalContextShape } from '../jsx/common/types';

const webpackStats = require('../webpack-stats.json');

const ADDRESS = argv.address;
const PORT = argv.port;

const app = express();

app.enable('strict routing');
app.disable('x-powered-by');

//// TODO - in case we ever need body-parser again, this code breaks app.all(...) proxying to django.
//// See https://github.com/nodejitsu/node-http-proxy/issues/1142 for the details.
// import bodyParser from 'body-parser';
// app.use(bodyParser.json({ limit: '2mb' }));

const proxy = httpProxy.createProxyServer({});
app.all(/\/(?:api|static|media|wagtail|admin)(?:$|\/)/, (req, res, next) => {
  proxy.web(req, res, { target: 'http://api' }, next);
});
proxy.on('error', e => console.log('Error: ' + e));

declare global {
  namespace Express {
    interface Request {
      reactContext: GlobalContextShape;
    }
  }
}

// Custom middleware which injects req.django with api and user fields.
app.use(async (req, res, next) => {
  try {
    const cookies = cookie.parse(req.headers.cookie || '');
    const csrfToken = cookies.csrftoken as string;

    const api = new API({
      csrfToken,
      base: 'http://api',
      cookie: req.get('Cookie') || '',
      realHost: req.get('host'),
    });

    const user = await api.call('me', 'GET');
    req.reactContext = {
      api,
      user,
    };
    next();
  } catch (err) {
    next(err);
  }
});

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

const getCb = (pageName: string) => async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const api = req.reactContext.api;

    const google_analytics_id = process.env.GOOGLE_ANALYTICS_ID;
    const webpackDevServer = process.env.NODE_ENV === 'development';

    const props = await requestToPageProps(pageName, req.reactContext, req);
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
app.get('/team/analytics', getCb('analytics/index'));
app.get('/team/zadarma', getCb('zadarma/index'));
app.get('/team/zadarma/pbx_call/:id', getCb('zadarma/pbx_call'));
app.get('/team/staff', getCb('staff/index_page'));
app.get('/team/staff/:id', getCb('staff/member_page'));
app.get('/team/cashier', getCb('cashier/index'));

// Form handling.
// Note: This middleware should be activated after httpProxy
// (see https://stackoverflow.com/questions/26632854/socket-hangup-while-posting-request-to-node-http-proxy-node-js for details)
app.use(express.urlencoded());

app.get('/login', async (req, res, next) => {
  try {
    if (req.reactContext.user.is_authenticated) {
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
    await req.reactContext.api.call('login/send-magic-link', 'POST', {
      email: req.body.email,
      next: req.query.next || '/',
    });

    res.redirect(301, '/login/check-your-email');
  } catch (err) {
    next(err);
  }
});

app.get('/login/check-your-email', getCb('auth/check-your-email'));

app.get('/login/magic-link', async (req, res, next) => {
  try {
    const response = await req.reactContext.api.call(
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

app.use(slash());

app.use(function(req, res, next) {
  res.status(404);
  getCb('error-pages/404')(req, res, next);
});

app.use((err, req, res, next) => {
  console.log(err);
  if (err instanceof APIError && (err.status === 404 || err.status === 403)) {
    res.status(err.status);
    getCb(`error-pages/${err.status}`)(req, res, next);
  } else {
    res.status(500);
    getCb('error-pages/500')(req, res, next);
  }
});

const server = new http.Server(app);
server.listen(PORT, ADDRESS, () => {
  console.log(`React render server listening at http://${ADDRESS}:${PORT}`);
});
