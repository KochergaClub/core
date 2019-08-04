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
import slash from 'express-slash';
import httpProxy from 'http-proxy';

import 'babel-polyfill';

import { API, APIError } from '../jsx/common/api';
import { GlobalContextShape } from '../jsx/common/types';
import { wagtailScreen } from '../jsx/screens';
import { WagtailPageType } from '../jsx/wagtail/pages/types';

import { GlobalFontsString } from '@kocherga/frontkit';

const webpackStats = require('../webpack-stats.json');

import {
  RenderResult,
  renderEntrypointWithData,
  renderEntrypoint,
  getGAScript,
} from './server/render';

import { Store } from './types';

const ADDRESS = argv.address;
const PORT = argv.port;

const app = express();
const server = new http.Server(app);

app.enable('strict routing');
app.disable('x-powered-by');

//// TODO - in case we ever need body-parser again, this code breaks app.all(...) proxying to django.
//// See https://github.com/nodejitsu/node-http-proxy/issues/1142 for the details.
// import bodyParser from 'body-parser';
// app.use(bodyParser.json({ limit: '2mb' }));

const IS_DEVELOPMENT = process.env.NODE_ENV === 'development';

// Hosts are bound through docker-compose
const API_HOST = 'api';
const API_ASYNC_HOST = IS_DEVELOPMENT ? 'api' : 'api-async';

const proxy = httpProxy.createProxyServer({
  target: {
    host: API_HOST,
  },
});
const wsProxy = httpProxy.createProxyServer({
  ws: true,
  target: {
    host: API_ASYNC_HOST,
  },
});
app.all(/\/(?:api|static|media|wagtail|admin)(?:$|\/)/, (req, res) => {
  proxy.web(req, res, {}, e => {
    console.log(e);
    res.status(500).send({ error: 'Backend is down' });
  });
});
server.on('upgrade', (req, socket, head) => {
  if (!req.url.startsWith('/ws/')) {
    console.log('not a typical websocket');
    socket.end();
  }
  wsProxy.ws(req, socket, head);
});

declare global {
  namespace Express {
    interface Request {
      reactContext: GlobalContextShape;
    }
  }
}

const getAPI = (req: express.Request) => {
  const cookies = cookie.parse(req.headers.cookie || '');
  const csrfToken = cookies.csrftoken as string;

  const api = new API({
    csrfToken,
    base: `http://${API_HOST}`,
    cookie: req.get('Cookie') || '',
    realHost: req.get('host'),
    wagtailAPIToken: process.env.WAGTAIL_API_TOKEN,
  });
  return api;
};

// This should be used for error pages, which can't load the real user.
const getFallbackContext = (req: express.Request) => {
  return {
    api: getAPI(req),
    user: {
      is_authenticated: false,
      permissions: [],
    },
  };
};

// Custom middleware which injects req.reactContext with api and user fields.
app.use(async (req, _, next) => {
  try {
    const api = getAPI(req);
    const user = await api.call('me', 'GET');

    req.reactContext = { api, user };
    next();
  } catch (err) {
    next(err);
  }
});

const sendFullHtml = (
  renderResult: RenderResult,
  req: express.Request,
  res: express.Response
) => {
  const { html, styleTags, helmet, props, screenName } = renderResult;
  const api = req.reactContext.api;

  const google_analytics_id = process.env.GOOGLE_ANALYTICS_ID;

  let bundleSrc = webpackStats.publicPath + webpackStats.chunks.main[0].name;
  if (IS_DEVELOPMENT) {
    // use webpack-dev-server in dev
    bundleSrc = 'http://localhost:8080' + bundleSrc;
  }

  const store: Store = {
    screenName,
    props,
    user: req.reactContext.user,
    csrfToken: api.csrfToken,
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

        ${GlobalFontsString}
        ${google_analytics_id ? getGAScript(google_analytics_id) : ''}
        ${styleTags}
      </head>
      <body>
        <div id="react-app">${html}</div>
        <script>
        // Info stored for app re-rendering
        var store = ${JSON.stringify(store)};
        </script>

        <script type="text/javascript" src="${bundleSrc}"></script>
      </body>
    </html>
    `;

  res.send(htmlTemplate);
};

const getCb = (screenName: string) => async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    if (!req.reactContext) {
      req.reactContext = getFallbackContext(req);
    }

    const renderResult = await renderEntrypointWithData(
      screenName,
      req.reactContext,
      req.params as { [k: string]: string },
      req.query as { [k: string]: string }
    );

    sendFullHtml(renderResult, req, res);
  } catch (err) {
    next(err);
  }
};

app.get('/team/watchmen/', getCb('watchmen/index'));
app.get('/team/analytics/', getCb('analytics/index'));
app.get('/team/zadarma/', getCb('zadarma/index'));
app.get('/team/zadarma/pbx_call/:id/', getCb('zadarma/pbx_call'));
app.get('/team/staff/', getCb('staff/index_page'));
app.get('/team/staff/:id/', getCb('staff/member_page'));
app.get('/team/cashier/', getCb('cashier/index'));
app.get('/team/kkm/', getCb('kkm/index'));
app.get('/team/ratio/', getCb('ratio/index'));
app.get('/team/ratio/training/:name/', getCb('ratio/training'));
app.get('/team/ratio/training/:name/schedule/', getCb('ratio/schedule'));
app.get('/team/mastermind_dating/', getCb('mastermind_dating/index'));
app.get(
  '/team/mastermind_dating/cohort/:id/',
  getCb('mastermind_dating/cohort_page')
);
app.get('/team/events/', getCb('events/index'));
app.get('/team/', (_, res) => res.redirect(302, '/team/staff/'));

app.get('/projects/', getCb('projects/index'));
app.get('/projects/:name/', getCb('projects/detail'));
app.get('/my/', getCb('my/index'));
app.get('/event/:id/', getCb('events/event_page'));
app.get('/', getCb('frontpage/index'));

// Form handling.
// Note: This middleware should be activated after httpProxy
// (see https://stackoverflow.com/questions/26632854/socket-hangup-while-posting-request-to-node-http-proxy-node-js for details)
app.use(express.urlencoded());

app.get('/login', async (req, res, next) => {
  try {
    if (req.reactContext.user.is_authenticated) {
      console.log('already authenticated');
      res.redirect(302, '/');
      return;
    }
    return getCb('auth/login')(req, res, next);
  } catch (err) {
    next(err);
  }
});

app.get('/login/check-your-email', getCb('auth/check-your-email'));
app.get('/login/magic-link', getCb('auth/magic-link'));

app.use(slash());

// Let's try Wagtail, maybe the page is in there somewhere.
app.use(async (req, res, next) => {
  http.get(
    {
      host: API_HOST,
      path: `/api/wagtail/pages/find/?html_path=${req.path}`,
      headers: {
        'X-WagtailAPIToken': req.reactContext.api.wagtailAPIToken,
        'X-Forwarded-Host': req.reactContext.api.realHost,
        Cookie: req.get('Cookie') || '',
      },
    },
    async wagtailFindRes => {
      try {
        if (wagtailFindRes.statusCode !== 302) {
          // no wagtail page
          next();
          return;
        }

        const wagtailUrl = wagtailFindRes.headers.location || '';
        console.log(`Got wagtail page ${wagtailUrl}`);

        const match = wagtailUrl.match(/(\d+)\/?$/);
        if (!match) {
          throw new Error('Unparsable redirected url');
        }
        const pageId = match[1];

        const pageProps = await req.reactContext.api.callWagtail(
          `pages/${pageId}/?fields=*`
        );
        pageProps.meta_type = pageProps.meta.type;

        let props = {};
        if (wagtailScreen.getInitialData) {
          props = await wagtailScreen.getInitialData(
            req.reactContext,
            pageProps
          );
        }

        sendFullHtml(
          {
            ...renderEntrypoint(
              wagtailScreen,
              req.reactContext,
              props as WagtailPageType
            ),
            screenName: 'wagtail/any',
            props,
          },
          req,
          res
        );
      } catch (err) {
        next(err);
      }
    }
  );
});

// Oh well. Time to give up.
app.use(function(req, res, next) {
  res.status(404);
  getCb('error-pages/404')(req, res, next);
});

const errorHandler: express.ErrorRequestHandler = (err, req, res, next) => {
  console.log(err);
  if (
    err instanceof APIError &&
    err.status === 403 &&
    req.reactContext &&
    !req.reactContext.user.is_authenticated
  ) {
    const nextUrl = encodeURIComponent(req.url);
    res.redirect(302, `/login?next=${nextUrl}`);
    return;
  }
  if (
    err instanceof APIError &&
    (err.status === 404 || err.status === 403 || err.status === 400)
  ) {
    res.status(err.status);
    getCb(`error-pages/${err.status}`)(req, res, next);
    return;
  }
  res.status(500);
  getCb('error-pages/500')(req, res, next);
};
app.use(errorHandler);

server.listen(PORT, ADDRESS, () => {
  console.log(`React render server listening at http://${ADDRESS}:${PORT}`);
});
