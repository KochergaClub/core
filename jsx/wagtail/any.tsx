import React from 'react';

import { Screen } from '../common/types';
import { WagtailPageType } from './types';

import HomePage from './pages/HomePage';

const AnyWagtailPage = (props: WagtailPageType) => {
  switch (props.meta.type) {
    case 'pages.HomePage':
      return <HomePage {...props} />;
    default:
      return <h1>Unknown Wagtail page type: ${props.meta.type}</h1>;
  }
};

const screen: Screen<WagtailPageType> = {
  component: AnyWagtailPage,
};

export default screen;