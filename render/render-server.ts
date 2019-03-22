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
import bodyParser from 'body-parser';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import 'babel-polyfill';

import { ServerStyleSheet } from 'styled-components';
import { Helmet } from 'react-helmet';

var ADDRESS = argv.address;
var PORT = argv.port;

var app = express();
var server = new http.Server(app);

app.use(bodyParser.json());

app.get('/', function(_, res) {
  res.end('React render server');
});

interface Opts {
  path: string;
  serializedProps: any;
}

async function reactRender(opts: Opts) {
  const { default: component } = await import('../jsx/' + opts.path);
  const props = JSON.parse(opts.serializedProps);

  const sheet = new ServerStyleSheet();

  const html = ReactDOMServer.renderToString(
    sheet.collectStyles(React.createElement(component, props))
  );
  const helmet = Helmet.renderStatic();
  const styleTags = sheet.getStyleTags();

  const helmetString =
    helmet.title.toString() + helmet.meta.toString() + helmet.link.toString();

  return [html, styleTags, helmetString];
}

app.post('/render', async (req, res) => {
  try {
    const [markup, style, helmet] = await reactRender(req.body);
    res.json({
      error: null,
      markup: markup,
      style: style,
      helmet: helmet,
    });
  } catch (err) {
    res.json({
      error: {
        type: err.constructor.name,
        message: err.message,
        stack: err.stack,
      },
      markup: null,
    });
  }
});

server.listen(PORT, ADDRESS, () => {
  console.log(`React render server listening at http://${ADDRESS}:${PORT}`);
});
