process.env.TZ = 'Europe/Moscow';

import express from 'express';
import http from 'http';
import httpProxy from 'http-proxy';
import next from 'next';
import * as yargs from 'yargs';

import { API_HOST } from './constants';
import nextjsEntrypoint from './nextjsEntrypoint';
import trailingSlashEndpoint from './trailingSlashEndpoint';

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

  const proxyTarget = {
    host: API_HOST.split(':', 2)[0],
    port: API_HOST.split(':', 2)[1] || '80',
  };

  const proxy = httpProxy.createProxyServer({
    target: proxyTarget,
  });

  // TODO - this duplicate proxy can probably be simplified, re-read https://github.com/http-party/node-http-proxy#proxying-websockets docs
  const wsProxy = httpProxy.createProxyServer({
    ws: true,
    target: proxyTarget,
  });

  app.all(/^\/(?:api|static|media|wagtail|admin)(?:$|\/)/, (req, res) => {
    proxy.web(req, res, {}, (e) => {
      console.error(e);
      try {
        res.status(500).send({ error: 'Backend is down' });
        res.end();
      } catch (e) {
        console.error('Failed to send error: ' + String(e));
      }
    });
  });
  httpServer.on('upgrade', (req, socket, head) => {
    if (!req.url.startsWith('/ws/')) {
      console.log('not a typical websocket');
      socket.end();
    }
    wsProxy.ws(req, socket, head, {}, (e) => {
      console.error(e);
    });
  });

  app.use(trailingSlashEndpoint);
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
