import Router from 'next/router';
import { NextPage } from '~/common/types';

export default (redirectUrl: string) => {
  const RedirectPage: NextPage = () => null;
  RedirectPage.getInitialProps = async ({ res }) => {
    if (res) {
      res.writeHead(302, {
        Location: redirectUrl,
      });
      res.end();
    } else {
      Router.push(redirectUrl);
    }
    return {};
  };
  return RedirectPage;
};
