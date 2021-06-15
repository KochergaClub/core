import '~/styles/global.css';

import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import NProgress from 'nprogress';
import { useEffect } from 'react';

import * as Sentry from '@sentry/node';

import { trackEvent, trackPageview } from '~/components/analytics';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN_FRONTEND,
});

interface MyProps extends AppProps {
  errorCode?: number; // unused
}

const routeChangeStart = () => {
  NProgress.start();
};

const routeChangeError = () => {
  NProgress.done();
};

const routeChangeComplete = (url: string) => {
  NProgress.done();
  trackPageview(url);
};

const MyApp: React.FC<MyProps> = ({ Component, pageProps }) => {
  const router = useRouter();

  useEffect(() => {
    router.events.on('routeChangeStart', routeChangeStart);
    router.events.on('routeChangeError', routeChangeError);
    router.events.on('routeChangeComplete', routeChangeComplete);
    return () => {
      router.events.off('routeChangeStart', routeChangeStart);
      router.events.off('routeChangeError', routeChangeError);
      router.events.off('routeChangeComplete', routeChangeComplete);
    };
  }, [router]);

  // React.StrictMode was enabled here globally, but turned out that it caused duplicate
  // GraphQL subscriptions and queries, which is too annoying to keep around.
  // Issue: https://github.com/apollographql/apollo-client/issues/6037
  return <Component {...pageProps} />;
};

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
