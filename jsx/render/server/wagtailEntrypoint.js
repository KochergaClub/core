const express = require('express');

const wagtailRoutes = [
  '/blog',
  '/blog/*',
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
