import * as React from 'react';

import ErrorPage from './ErrorPage';

export default () => (
  <ErrorPage
    title="Нет доступа"
    code={403}
    image="/static/error-pages/403.jpg"
  />
);
