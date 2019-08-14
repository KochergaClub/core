import React from 'react';

import ErrorPage from './ErrorPage';

const Error500 = () => (
  <ErrorPage title="Ошибка" code={500} image="/static/error-pages/500.jpg" />
);

export default Error500;
