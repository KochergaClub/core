import React from 'react';

import ErrorPage from './ErrorPage';

const Error403 = () => (
  <ErrorPage
    title="Нет доступа"
    code={403}
    image="/static/error-pages/403.jpg"
  />
);

export default Error403;
