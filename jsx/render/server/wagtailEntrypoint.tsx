import express from 'express';
import http from 'http';

import { wagtailScreen } from '~/screens';
import { AnyPageType } from '~/wagtail/pages/types';

import { API_HOST } from './constants';

import { sendEntrypointHtml } from './render';

export const wagtailEntrypoint: express.RequestHandler = async (
  req,
  res,
  next
) => {
  http.get(
    {
      host: API_HOST,
      path: `/api/wagtail/pages/find/?html_path=${req.path}`,
      headers: {
        'X-WagtailAPIToken': req.reactContext.api.wagtailAPIToken,
        'X-Forwarded-Host': req.reactContext.api.realHost,
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

        const match = wagtailUrl.match(/(\d+)\/?$/);
        if (!match) {
          throw new Error('Unparsable redirected url');
        }
        const pageId = match[1];

        const pageProps = (await req.reactContext.api.callWagtail(
          `pages/${pageId}/?fields=*`
        )) as AnyPageType;
        pageProps.meta_type = pageProps.meta.type;

        let props = {};
        if (wagtailScreen.getInitialData) {
          props = await wagtailScreen.getInitialData(
            req.reactContext,
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
