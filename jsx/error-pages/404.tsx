import * as React from 'react';

import ErrorPage from './ErrorPage';

export default () => (
  <ErrorPage
    title="Страница не найдена"
    code={404}
    image="/static/error-pages/404.jpg"
  />
);