import React from 'react';

import { Screen } from '../common/types';
import ErrorPage from './ErrorPage';

const Screen500 = () => (
  <ErrorPage title="Ошибка" code={500} image="/static/error-pages/500.jpg" />
);

const screen: Screen<{}> = {
  component: Screen500,
};

export default screen;
