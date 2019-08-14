const express = require('express');
const { parse } = require('url');

const wagtailRoutes = ['/blog', '/blog/*'];

exports.default = nextApp => {
  const router = express.Router();

  wagtailRoutes.forEach(route => {
    router.get(route, (req, res) => {
      return nextApp.render(req, res, '/wagtail-any', req.query);
    });
  });

  return router;
};
