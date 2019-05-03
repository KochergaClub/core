import React from 'react';

import { Screen } from '../common/types';
import ErrorPage from './ErrorPage';

const Screen404 = () => (
  <ErrorPage
    title="Страница не найдена"
    code={404}
    image="/static/error-pages/404.jpg"
  />
);

export default {
  component: Screen404,
} as Screen<{}>;
