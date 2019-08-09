import * as express from 'express';
import cookie from 'cookie';

import { configureStore } from '~/redux/store';
import { GlobalContextShape } from '~/common/types';

import { API } from '~/common/api';

import { API_HOST } from './constants';

declare global {
  namespace Express {
    interface Request {
      reactContext: GlobalContextShape;
    }
  }
}

const getAPI = (req: express.Request) => {
  const cookies = cookie.parse(req.headers.cookie || '');
  const csrfToken = cookies.csrftoken as string;

  const api = new API({
    csrfToken,
    base: `http://${API_HOST}`,
    cookie: req.get('Cookie') || '',
    realHost: req.get('host'),
    wagtailAPIToken: process.env.WAGTAIL_API_TOKEN,
  });
  return api;
};

// Custom middleware which injects req.reactContext with api and user fields.
export const globalContext = async (
  req: express.Request,
  _: express.Response,
  next: express.NextFunction
) => {
  try {
    const api = getAPI(req);
    const user = await api.call('me', 'GET');

    req.reactContext = { api, user, store: configureStore() };

    next();
  } catch (err) {
    next(err);
  }
};

// This should be used for error pages, which can't load the real user.
export const getFallbackContext = (
  req: express.Request
): GlobalContextShape => {
  return {
    api: getAPI(req),
    user: {
      is_authenticated: false,
      permissions: [],
    },
    store: configureStore(),
  };
};
