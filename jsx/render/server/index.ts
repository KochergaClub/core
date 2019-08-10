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
import httpProxy from 'http-proxy';

import 'babel-polyfill';

import { API_HOST, API_ASYNC_HOST } from './constants';

// middlewares
import { setupStore } from './globalContext';
import { reactEntrypoint } from './reactEntrypoint';
import { wagtailEntrypoint } from './wagtailEntrypoint';
import { errorHandler, notFoundHandler } from './errorHandler';

const ADDRESS = argv.address;
const PORT = argv.port;

const app = express();
const server = new http.Server(app);

app.enable('strict routing');
app.disable('x-powered-by');

//// NOTE. In case we ever need body-parser again: this code breaks app.all(...) proxying to Django.
//// See https://github.com/nodejitsu/node-http-proxy/issues/1142 for the details.
// import bodyParser from 'body-parser';
// app.use(bodyParser.json({ limit: '2mb' }));

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

// Inject req.reduxStore
app.use(setupStore);

app.use(reactEntrypoint);

// Form handling.
// Note: This middleware should be activated after httpProxy
// (see https://stackoverflow.com/questions/26632854/socket-hangup-while-posting-request-to-node-http-proxy-node-js for details)
app.use(express.urlencoded());

// Let's try Wagtail, maybe the page is in there somewhere.
app.use(wagtailEntrypoint);

// Oh well. Time to give up.
app.use(notFoundHandler);

app.use(errorHandler);

server.listen(PORT, ADDRESS, () => {
  console.log(`React render server listening at http://${ADDRESS}:${PORT}`);
});
