import React from 'react';

import { Screen } from '../common/types';
import { WagtailPageType } from './types';

import FreeFormPage from './pages/FreeFormPage';
import RatioSectionIndexPage from './pages/RatioSectionIndexPage';
import RatioSectionPage from './pages/RatioSectionPage';

const UnknownPage = (props: WagtailPageType) => (
  <h1>
    Unknown Wagtail page type: <code>{props.meta.type}</code>
  </h1>
);

const AnyWagtailPage = (props: WagtailPageType) => {
  switch (props.meta_type) {
    case 'pages.FreeFormPage':
      return <FreeFormPage {...props} />;
    case 'ratio.SectionIndexPage':
      return <RatioSectionIndexPage {...props} />;
    case 'ratio.SectionPage':
      return <RatioSectionPage {...props} />;
    default:
      return <UnknownPage {...props} />;
  }
};

const screen: Screen<WagtailPageType> = {
  component: AnyWagtailPage,
};

export default screen;
