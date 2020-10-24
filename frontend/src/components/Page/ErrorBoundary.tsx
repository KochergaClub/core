import React from 'react';

import { A } from '~/frontkit';
import * as Sentry from '@sentry/node';

import { PaddedBlock } from '~/components';

const FallbackComponent: React.FC = () => {
  return (
    <PaddedBlock>
      <h1>Что-то пошло не так.</h1>
      <h2>В коде страницы баг.</h2>
      <p>
        Мы будем благодарны, если вы зарепортите проблему в наш{' '}
        <A href="https://t.me/kocherga_code">Телеграм-чат</A> или{' '}
        <A href="https://gitlab.com/kocherga/core/issues">GitLab</A>.
      </p>
    </PaddedBlock>
  );
};

interface SSRProps {}

class SSRErrorBoundary extends React.Component<
  SSRProps,
  { hasError: boolean }
> {
  constructor(props: SSRProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(err: unknown) {
    Sentry.captureException(err);
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      if (typeof jest !== 'undefined') {
        throw new Error('Jest is not tolerant to errors');
      }
      return <FallbackComponent />;
    }

    return this.props.children;
  }
}

const ErrorBoundary: React.FC = ({ children }) => {
  // due to @sentry/node -> @sentry/react patching in next.config.js we can't just use Sentry.ErrorBoundary, typescript will complain
  const SentryErrorBoundary = (Sentry as any).ErrorBoundary as
    | React.ComponentType<any>
    | undefined;

  if (!SentryErrorBoundary) {
    // probably SSR, @sentry/react is replaced with @sentry/node on backend so we can't use Sentry.ErrorBoundary
    return <SSRErrorBoundary>{children}</SSRErrorBoundary>;
  }
  // TODO - showDialog?
  return (
    <SentryErrorBoundary fallback={FallbackComponent}>
      {children}
    </SentryErrorBoundary>
  );
};

export default ErrorBoundary;
