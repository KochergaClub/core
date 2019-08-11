import express from 'express';
import http from 'http';

import wagtailScreen from '~/wagtail/any';
import { AnyPageType } from '~/wagtail/pages/types';
import { selectAPI } from '~/core/selectors';

import { API_HOST } from './constants';

import { sendEntrypointHtml } from './render';

export const wagtailEntrypoint: express.RequestHandler = async (
  req,
  res,
  next
) => {
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

        const pageProps = (await api.callWagtail(
          `pages/${pageId}/?fields=*`
        )) as AnyPageType;
        pageProps.meta_type = pageProps.meta.type;

        let props = {};
        if (wagtailScreen.getInitialData) {
          props = await wagtailScreen.getInitialData(
            req.reduxStore,
            pageProps as any // FIXME
          );
        }

        sendEntrypointHtml({ type: 'wagtail', props }, req, res);
      } catch (err) {
        next(err);
      }
    }
  );
};
