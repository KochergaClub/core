import App from 'next/app';
import Router from 'next/router';
import getConfig from 'next/config';

import NProgress from 'nprogress';

import * as Sentry from '@sentry/node';

import { trackPageview, trackEvent } from '~/components/analytics';

import '~/css/react-datepicker.css';

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
  errorCode?: number;
}

class MyApp extends App<MyProps> {
  //  static async getInitialProps({ Component, ctx, router }: AppContext) {
  //    let pageProps = {};
  //    if (Component.getInitialProps) {
  //      try {
  //        pageProps = await Component.getInitialProps(ctx);
  //      } catch (err) {
  //        Sentry.captureException(err);
  //        if (err instanceof NeedLoginError) {
  //          // During getInitialProps we checked permissions (through requireAuth) and it decided that
  //          // the user needs to be logged in.
  //          // If we're on the server, we should redirect to /login.
  //          // If we're on the client side, we should push /login to router.
  //          const loginUrl =
  //            '/login' +
  //            (ctx.asPath ? `?next=${encodeURIComponent(ctx.asPath)}` : '');
  //          if (ctx.res) {
  //            ctx.res.writeHead(302, { Location: loginUrl });
  //            ctx.res.end();
  //          } else {
  //            router.push(loginUrl);
  //          }
  //          return { pageProps: {} };
  //        } else if (
  //          err instanceof APIError &&
  //          (err.status === 404 || err.status === 403 || err.status === 400)
  //        ) {
  //          if (ctx.res) {
  //            ctx.res.statusCode = err.status;
  //          }
  //          return { pageProps: {}, errorCode: err.status };
  //        } else {
  //          throw err;
  //        }
  //      }
  //    }
  //
  //    return { pageProps };
  //  }
  //render() {
  //  const { Component, pageProps, errorCode } = this.props;
  //  // React.StrictMode was enabled here globally, but turned out that it caused duplicate
  //  // GraphQL subscriptions and queries, which is too annoying to keep around.
  //  // Issue: https://github.com/apollographql/apollo-client/issues/6037
  //  return errorCode ? (
  //    <Error statusCode={errorCode} />
  //  ) : (
  //    <Component {...pageProps} />
  //  );
  //}
}

interface WebVitals {
  id: string;
  name: string;
  value: number;
  label: string;
}

export function reportWebVitals(metric: WebVitals): void {
  // These metrics can be sent to any analytics service
  trackEvent(metric.name, {
    category:
      metric.label === 'web-vital' ? 'Web Vitals' : 'Next.js custom metric',
    label: metric.id,
    value: Math.round(
      metric.name === 'CLS' ? metric.value * 1000 : metric.value
    ),
    non_interaction: true,
  });
}

export default MyApp;
