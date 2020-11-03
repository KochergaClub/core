import { ServerResponse } from 'http';
import Router from 'next/router';

import { NextPage } from '~/common/types';

export const redirect = (url: string, res: ServerResponse | undefined) => {
  if (res) {
    res.writeHead(302, {
      Location: url,
    });
    res.end();
  } else {
    Router.push(url);
  }
  return {};
};

const buildRedirectPage = (redirectUrl: string) => {
  const RedirectPage: NextPage = () => null;
  RedirectPage.getInitialProps = async ({ res }) => {
    return redirect(redirectUrl, res);
  };
  return RedirectPage;
};

export default buildRedirectPage;
