import * as express from 'express';
import cookie from 'cookie';

import { configureStore } from '~/redux/store';
import { GlobalContextShape } from '~/common/types';

import { APIProps } from '~/common/api';
import { configureAPI } from '~/core/actions';
import { selectAPI } from '~/core/selectors';

import { API_HOST } from './constants';

declare global {
  namespace Express {
    interface Request {
      reactContext: GlobalContextShape;
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

// Custom middleware which injects req.reactContext with api and user fields.
export const globalContext = async (
  req: express.Request,
  _: express.Response,
  next: express.NextFunction
) => {
  try {
    const store = configureStore();

    store.dispatch(configureAPI(reqToAPIConfig(req)));
    const api = selectAPI(store.getState());
    const user = await api.call('me', 'GET');

    req.reactContext = {
      store,
      user, // deprecated, will be removed soon
      api, // deprecated, will be removed soon
    };

    next();
  } catch (err) {
    next(err);
  }
};

// This method should be used for error pages, which can't load the real user.
export const getFallbackContext = (
  req: express.Request
): GlobalContextShape => {
  // FIXME - copy-pasted from globalContext()
  const store = configureStore();
  store.dispatch(configureAPI(reqToAPIConfig(req)));
  const api = selectAPI(store.getState());
  const user = {
    is_authenticated: false,
    permissions: [],
  };

  return {
    store,
    user,
    api,
  };
};
