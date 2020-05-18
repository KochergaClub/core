import { Provider } from 'react-redux';
import cookie from 'cookie';

import App, { AppContext } from 'next/app';
import withRedux, { NextJSContext } from 'next-redux-wrapper';
import Router from 'next/router';
import getConfig from 'next/config';

import NProgress from 'nprogress';

import * as Sentry from '@sentry/node';

import { configureStore, Store } from '~/redux/store';
import { configureAPI, loadUser, cleanupAPIForClient } from '~/core/actions';
import { APIProps, APIError } from '~/common/api';
import { API_HOST } from '../../server/constants';

import { selectUser } from '~/core/selectors';
import { trackPageview } from '~/components/analytics';

import Error from './_error';

Sentry.init({
  dsn: getConfig().publicRuntimeConfig.sentryDSN,
});

Router.events.on('routeChangeStart', () => {
  NProgress.start();
});
Router.events.on('routeChangeComplete', url => {
  NProgress.done();
  trackPageview(url);
});
Router.events.on('routeChangeError', () => NProgress.done());

interface MyProps {
  store: Store;
  errorCode?: number;
}

class MyApp extends App<MyProps> {
  static async getInitialProps({ Component, ctx, router }: AppContext) {
    const store = ((ctx as any) as NextJSContext).store as Store;
    if (ctx.req) {
      const cookies = cookie.parse(ctx.req.headers.cookie || '');
      const csrfToken = cookies.csrftoken as string;

      const apiConfig: APIProps = {
        csrfToken,
        base: `http://${API_HOST}`,
        cookie: ctx.req.headers.cookie || '',
        realHost: ctx.req.headers.host,
      };
      store.dispatch(configureAPI(apiConfig));
      await store.dispatch(loadUser());
    }

    let pageProps = {};
    if (Component.getInitialProps) {
      try {
        pageProps = await Component.getInitialProps(ctx);
      } catch (err) {
        Sentry.captureException(err);
        const user = selectUser(store.getState());
        if (
          err instanceof APIError &&
          err.status === 403 &&
          !user.is_authenticated
        ) {
          // During getInitialProps we called API and it responded with 403.
          // If we're on the server, we should redirect to /login.
          // If we're on the client side, we should push /login to router.
          const loginUrl =
            '/login' +
            (ctx.asPath ? `?next=${encodeURIComponent(ctx.asPath)}` : '');
          if (ctx.res) {
            ctx.res.writeHead(302, { Location: loginUrl });
            ctx.res.end();
          } else {
            router.push(loginUrl);
          }
          return { pageProps: {} };
        } else if (
          err instanceof APIError &&
          (err.status === 404 || err.status === 403 || err.status === 400)
        ) {
          if (ctx.res) {
            ctx.res.statusCode = err.status;
          }
          return { pageProps: {}, errorCode: err.status };
        } else {
          throw err;
        }
      }
    }

    if (ctx.req) {
      // This is critical so that we don't leak wagtail token to the html!
      // (TODO - revisit, I think we don't use wagtail token anymore.)
      store.dispatch(cleanupAPIForClient());
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps, store, errorCode } = this.props;

    // React.StrictMode was enabled here globally, but turned out that it caused duplicate
    // GraphQL subscriptions and queries, which is too annoying to keep around.
    // Issue: https://github.com/apollographql/apollo-client/issues/6037
    return (
      <Provider store={store}>
        {errorCode ? (
          <Error statusCode={errorCode} />
        ) : (
          <Component {...pageProps} />
        )}
      </Provider>
    );
  }
}

export default withRedux(configureStore)(MyApp);
