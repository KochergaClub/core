import React from 'react';

import { A } from '@kocherga/frontkit';
import * as Sentry from '@sentry/node';

import { PaddedBlock } from '~/components';

interface Props {}
interface State {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(err: any) {
    Sentry.captureException(err);
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      if (typeof jest !== undefined) {
        throw new Error('Jest is not tolerant to errors');
      }
      // You can render any custom fallback UI
      return (
        <PaddedBlock>
          <h1>Что-то пошло не так.</h1>
          <h2>В коде страницы баг.</h2>
          <p>
            Мы будем благодарны, если вы зарепортите проблему в наш{' '}
            <A href="https://gitlab.com/kocherga/core/issues">GitLab</A> или{' '}
            <A href="https://t.me/kocherga_code">Телеграм-чат</A>.
          </p>
        </PaddedBlock>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
