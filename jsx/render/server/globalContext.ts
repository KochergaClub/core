import * as express from 'express';
import cookie from 'cookie';

import { configureStore, Store } from '~/redux/store';

import { APIProps } from '~/common/api';
import { configureAPI, loadUser } from '~/core/actions';

import { API_HOST } from './constants';

declare global {
  namespace Express {
    interface Request {
      reduxStore: Store;
    }
  }
}

const reqToAPIConfig = (req: express.Request): APIProps => {
  const cookies = cookie.parse(req.headers.cookie || '');
  const csrfToken = cookies.csrftoken as string;

  return {
    csrfToken,
    base: `http://${API_HOST}`,
    cookie: req.get('Cookie') || '',
    realHost: req.get('host'),
    wagtailAPIToken: process.env.WAGTAIL_API_TOKEN,
  };
};

// Custom middleware which injects req.reduxStore with api and user.
export const setupStore = async (
  req: express.Request,
  _: express.Response,
  next: express.NextFunction
) => {
  try {
    const store = configureStore();

    store.dispatch(configureAPI(reqToAPIConfig(req)));
    await store.dispatch(loadUser());

    req.reduxStore = store;

    next();
  } catch (err) {
    next(err);
  }
};

// This method should be used for error pages, which can't load the real user.
export const setupFallbackStore = (req: express.Request) => {
  // FIXME - copy-pasted from globalContext()
  const store = configureStore();
  store.dispatch(configureAPI(reqToAPIConfig(req)));

  req.reduxStore = store;
};
