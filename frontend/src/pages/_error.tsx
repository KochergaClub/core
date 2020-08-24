import Router from 'next/router';

import * as Sentry from '@sentry/node';

import { NeedLoginError } from '~/auth/errors';
import { APIError } from '~/common/api';
import { NextPage } from '~/common/types';
import Error302 from '~/error-pages/302';
import ErrorPage from '~/error-pages/ErrorPage';

interface Props {
  statusCode?: number;
}

const NextErrorPage: NextPage<Props> = ({ statusCode }) => {
  switch (statusCode) {
    case 302:
      return <Error302 />;
    case 403:
    case 404:
      return <ErrorPage code={statusCode} />;
    default:
      return <ErrorPage code={500} />;
  }
};

NextErrorPage.getInitialProps = async ({ asPath, res, err }) => {
  if (res?.statusCode === 404) {
    return { statusCode: 404 };
  }

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
    return { statusCode: 302 };
  } else if (
    err instanceof APIError &&
    (err.status === 404 || err.status === 403 || err.status === 400)
  ) {
    if (res) {
      res.statusCode = err.status;
    }
    return { statusCode: err.status };
  }

  Sentry.captureException(err);
  return { statusCode: 500 };
};

export default NextErrorPage;
