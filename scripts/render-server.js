#!/usr/bin/env node

const argv = require('yargs')
      .option('p', {
        alias: 'port',
        description: 'Specify the server\'s port',
        default: 9009
      })
      .option('a', {
        alias: 'address',
        description: 'Specify the server\'s address',
        default: '127.0.0.1'
      })
      .help('h').alias('h', 'help')
      .strict()
      .argv;

const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const React = require('react');
const ReactDOMServer = require('react-dom/server');

const { ServerStyleSheet } = require('styled-components');

// Ensure support for loading files that contain ES6+7 & JSX
require('babel-core/register');

var ADDRESS = argv.address;
var PORT = argv.port;

var app = express();
var server = http.Server(app);

app.use(bodyParser.json());

app.get('/', function(req, res) {
	res.end('React render server');
});

function reactRender(opts, cb) {
  try {
    const component = require(opts.path).default;
    const props = JSON.parse(opts.serializedProps);

    const sheet = new ServerStyleSheet();

    const html = ReactDOMServer.renderToString(
      sheet.collectStyles(
        React.createElement(component, props)
      )
    );
    const styleTags = sheet.getStyleTags();
    cb(null, html, styleTags);
  } catch(err) {
    cb(err);
  }
}

app.post('/render', function(req, res) {
  reactRender(req.body, function(err, markup, style) {
    if (err) {
			res.json({
				error: {
					type: err.constructor.name,
					message: err.message,
					stack: err.stack
				},
				markup: null
			});
		} else {
			res.json({
				error: null,
				markup: markup,
        style: style,
			});
		}
	});
});

server.listen(PORT, ADDRESS, function() {
	console.log('React render server listening at http://' + ADDRESS + ':' + PORT);
});
