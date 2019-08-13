const http = require('http');

const wagtailScreen = require('~/wagtail/any').default;
const { selectAPI } = require('~/core/selectors');

const { API_HOST } = require('./constants');

exports.wagtailEntrypoint = async (req, res, next) => {
  const api = selectAPI(req.reduxStore.getState());

  http.get(
    {
      host: API_HOST,
      path: `/api/wagtail/pages/find/?html_path=${req.path}`,
      headers: {
        'X-WagtailAPIToken': api.wagtailAPIToken,
        'X-Forwarded-Host': api.realHost,
        Cookie: req.get('Cookie') || '',
      },
    },
    async wagtailFindRes => {
      try {
        if (wagtailFindRes.statusCode !== 302) {
          // no wagtail page
          next();
          return;
        }

        const wagtailUrl = wagtailFindRes.headers.location || '';
        console.log(`Got wagtail page ${wagtailUrl}`);

        if (!req.path.endsWith('/')) {
          // wait, the page url is not normalized properly
          res.redirect(302, req.path + '/');
          return;
        }

        const match = wagtailUrl.match(/(\d+)\/?$/);
        if (!match) {
          throw new Error('Unparsable redirected url');
        }
        const pageId = match[1];

        const pageProps = await api.callWagtail(`pages/${pageId}/?fields=*`);
        pageProps.meta_type = pageProps.meta.type;

        let props = {};
        if (wagtailScreen.getInitialData) {
          props = await wagtailScreen.getInitialData(req.reduxStore, pageProps);
        }

        res.send('TODO');
        // sendEntrypointHtml({ type: 'wagtail', props }, req, res);
      } catch (err) {
        next(err);
      }
    }
  );
};
