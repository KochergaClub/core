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

  router.get('/preview', async (req, res, next) => {
    try {
      const token = req.query.token;
      const pageProps = await req.reactContext.api.callWagtail(
        `page_preview/find/?token=${token}`
      );
      await renderWagtailPage(pageProps, req, res);
    } catch (err) {
      next(err);
    }
  });

  wagtailRoutes.forEach(route => {
    router.get(route, (req, res) => {
      return nextApp.render(req, res, '/wagtail-any', req.query);
    });
  });

  return router;
};
