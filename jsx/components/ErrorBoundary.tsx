import React from 'react';

interface Props {}
interface State {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <>
          <h1>Что-то пошло не так.</h1>
          <h2>
            В коде страницы баг. Зарепортите его в{' '}
            <a href="https://gitlab.com/kocherga/forum">GitLab</a>, пожалуйста.
            А потом обновите страницу и больше не делайте то, что привело к
            ошибке.
          </h2>
        </>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
