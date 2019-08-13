import Router from 'next/router';
import { NextPage } from '~/common/types';

import { ServerResponse } from 'http';

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

export default (redirectUrl: string) => {
  const RedirectPage: NextPage = () => null;
  RedirectPage.getInitialProps = async ({ res }) => {
    return redirect(redirectUrl, res);
  };
  return RedirectPage;
};
