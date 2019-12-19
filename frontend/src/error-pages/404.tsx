import React from 'react';

import ErrorPage from './ErrorPage';

const Error404 = () => (
  <ErrorPage
    title="Страница не найдена"
    code={404}
    image="/static/error-pages/404.jpg"
  />
);

export default Error404;
