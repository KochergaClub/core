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

const http = require('http');
const express = require('express');
const httpProxy = require('http-proxy');

//import 'babel-polyfill';

const { API_HOST, API_ASYNC_HOST } = require('./constants');

const trailingSlashEndpoint = require('./trailingSlashEndpoint').default;
const tildaEndpoint = require('./tildaEndpoint').default;
const nextjsEntrypoint = require('./nextjsEntrypoint').default;
const wagtailEntrypoint = require('./wagtailEntrypoint').default;

const next = require('next');

const ADDRESS = argv.address;
const PORT = argv.port;

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
      host: API_HOST,
    },
  });
  const wsProxy = httpProxy.createProxyServer({
    ws: true,
    target: {
      host: API_ASYNC_HOST,
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
    wsProxy.ws(req, socket, head, e => {
      console.error(e);
    });
  });

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
