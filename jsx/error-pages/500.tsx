import * as React from 'react';

import ErrorPage from './ErrorPage';

export default () => (
  <ErrorPage title="Ошибка" code={500} image="/static/error-pages/500.jpg" />
);
