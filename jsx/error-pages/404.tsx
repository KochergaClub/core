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

const screen: Screen<{}> = {
  component: Screen404,
};

export default screen;
