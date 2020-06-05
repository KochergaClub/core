import React from 'react';
import * as Sentry from '@sentry/node';
import Router from 'next/router';

import { NeedLoginError } from '~/auth/errors';
import { NextPage } from '~/common/types';

import Error403 from '~/error-pages/403';
import Error404 from '~/error-pages/404';
import Error500 from '~/error-pages/500';
import { APIError } from '~/common/api';

interface Props {
  statusCode?: number;
}

const ErrorPage: NextPage<Props> = ({ statusCode }) => {
  switch (statusCode) {
    case 403:
      return <Error403 />;
    case 404:
      return <Error404 />;
    default:
      return <Error500 />;
  }
};

ErrorPage.getInitialProps = async ({ asPath, res, err }) => {
  if (res?.statusCode === 404) {
    return { statusCode: 404 };
  }

  console.log(err);
  Sentry.captureException(err);
  if (err instanceof NeedLoginError) {
    // During getInitialProps we checked permissions (through requireAuth) and it decided that
    // the user needs to be logged in.
    // If we're on the server, we should redirect to /login.
    // If we're on the client side, we should push /login to router.
    const loginUrl =
      '/login' + (asPath ? `?next=${encodeURIComponent(asPath)}` : '');
    if (res) {
      res.writeHead(302, { Location: loginUrl });
      res.end();
    } else {
      Router.push(loginUrl);
    }
    return { pageProps: {} };
  } else if (
    err instanceof APIError &&
    (err.status === 404 || err.status === 403 || err.status === 400)
  ) {
    if (res) {
      res.statusCode = err.status;
    }
    return { pageProps: {}, errorCode: err.status };
  }
  return { statusCode: 500 };
};

export default ErrorPage;
