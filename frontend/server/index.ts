process.env.TZ = 'Europe/Moscow';

import * as yargs from 'yargs';

const argv = yargs
  .option('p', {
    alias: 'port',
    description: "Specify the server's port",
    default: '80',
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

import { API_HOST, API_ASYNC_HOST } from './constants';

// import apolloServer from './apolloServer';
import trailingSlashEndpoint from './trailingSlashEndpoint';
import tildaEndpoint from './tildaEndpoint';
import nextjsEntrypoint from './nextjsEntrypoint';
import wagtailEntrypoint from './wagtailEntrypoint';

import next from 'next';

const ADDRESS = argv.address as string;
const PORT = parseInt(argv.port as string);

async function main() {
  const dev = process.env.NODE_ENV !== 'production';
  const nextApp = next({ dev });
  await nextApp.prepare();

  const app = express();
  const httpServer = new http.Server(app);

  app.enable('strict routing');
  app.disable('x-powered-by');

  //// NOTE. In case we ever need body-parser again: this code breaks app.all(...) proxying to Django.
  //// See https://github.com/nodejitsu/node-http-proxy/issues/1142 for the details.
  // import bodyParser from 'body-parser';
  // app.use(bodyParser.json({ limit: '2mb' }));

  const proxy = httpProxy.createProxyServer({
    target: {
      host: API_HOST.split(':', 2)[0],
      port: API_HOST.split(':', 2)[1] || '80',
    },
  });
  const wsProxy = httpProxy.createProxyServer({
    ws: true,
    target: {
      host: API_ASYNC_HOST.split(':', 2)[0],
      port: API_ASYNC_HOST.split(':', 2)[1] || '80',
    },
  });
  app.all(/^\/(?:api|static|media|wagtail|admin)(?:$|\/)/, (req, res) => {
    proxy.web(req, res, {}, e => {
      console.log(e);
      res.status(500).send({ error: 'Backend is down' });
    });
  });
  httpServer.on('upgrade', (req, socket, head) => {
    if (!req.url.startsWith('/ws/')) {
      console.log('not a typical websocket');
      socket.end();
    }
    wsProxy.ws(req, socket, head, {}, e => {
      console.error(e);
    });
  });

  // apolloServer.applyMiddleware({ app, path: '/graphql' });

  app.use(trailingSlashEndpoint);
  app.use(tildaEndpoint);
  app.use(wagtailEntrypoint(nextApp));
  app.use(nextjsEntrypoint(nextApp));

  // Form handling.
  // Note: This middleware should be activated after httpProxy
  // (see https://stackoverflow.com/questions/26632854/socket-hangup-while-posting-request-to-node-http-proxy-node-js for details)
  // app.use(express.urlencoded());

  httpServer.listen(PORT, ADDRESS, () => {
    console.log(`React render server listening at http://${ADDRESS}:${PORT}`);
  });
}

main();
