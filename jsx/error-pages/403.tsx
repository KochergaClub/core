import React from 'react';

import { Screen } from '../common/types';
import ErrorPage from './ErrorPage';

const Screen403 = () => (
  <ErrorPage
    title="Нет доступа"
    code={403}
    image="/static/error-pages/403.jpg"
  />
);

export default {
  component: Screen403,
} as Screen;
