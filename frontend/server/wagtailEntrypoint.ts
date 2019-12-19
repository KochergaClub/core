import * as express from 'express';

import Server from 'next/dist/next-server/server/next-server';

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

export default (nextApp: Server) => {
  const router = express.Router();

  wagtailRoutes.forEach(route => {
    router.get(route, (req, res) => {
      return nextApp.render(req, res, '/wagtail-any', req.query);
    });
  });

  return router;
};
