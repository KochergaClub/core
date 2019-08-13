import React from 'react';
import { Provider } from 'react-redux';
import cookie from 'cookie';

import App, { AppContext, Container } from 'next/app';
import withRedux, { NextJSContext } from 'next-redux-wrapper';
import Router from 'next/router';

import { configureStore, Store } from '~/redux/store';
import { configureAPI, loadUser, cleanupAPIForClient } from '~/core/actions';
import { APIProps, APIError } from '~/common/api';
import { API_HOST } from '~/render/server/constants';

import { selectUser } from '~/core/selectors';
import * as gtag from '~/common/gtag';

Router.events.on('routeChangeComplete', url => gtag.pageview(url));

class MyApp extends App<{ store: Store }> {
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
        wagtailAPIToken: process.env.WAGTAIL_API_TOKEN,
      };
      store.dispatch(configureAPI(apiConfig));
      await store.dispatch(loadUser());
    }

    let pageProps = {};
    if (Component.getInitialProps) {
      try {
        pageProps = await Component.getInitialProps(ctx);
      } catch (err) {
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
        } else {
          // TODO - set errorCode and render <Render> in render() later to support custom error pages again.
          throw err;
        }
      }
    }

    if (ctx.req) {
      // This is critical so that we don't leak wagtail token to the html!
      store.dispatch(cleanupAPIForClient());
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps, store } = this.props;
    return (
      <Container>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </Container>
    );
  }
}

export default withRedux(configureStore)(MyApp);
