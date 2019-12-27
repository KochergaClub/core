import React from 'react';

import { NextPage } from '~/common/types';

import Error403 from '~/error-pages/403';
import Error404 from '~/error-pages/404';
import Error500 from '~/error-pages/500';

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

ErrorPage.getInitialProps = async ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : undefined;
  return { statusCode };
};

export default ErrorPage;
