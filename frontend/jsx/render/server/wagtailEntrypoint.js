const express = require('express');

const wagtailRoutes = [
  '/',
  '/preview',
  '/blog',
  '/blog/*',
  '/faq',
  '/faq/*',
  '/projects',
  '/projects/*',
  '/team/ratio/workbooks',
  '/team/ratio/workbooks/*',
  '/team/ratio/sections',
  '/team/ratio/sections/*',
];

exports.default = nextApp => {
  const router = express.Router();

  wagtailRoutes.forEach(route => {
    router.get(route, (req, res) => {
      return nextApp.render(req, res, '/wagtail-any', req.query);
    });
  });

  return router;
};
