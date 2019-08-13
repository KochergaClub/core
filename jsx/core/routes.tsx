import React from 'react';

import { Screen } from '~/common/types';

export interface KochergaRoute {
  screen: Screen<{}>;
  path: string;
}

export const errorPages: { [k: number]: React.ComponentType } = {
  400: require('~/error-pages/500').default.component,
  403: require('~/error-pages/403').default.component,
  404: require('~/error-pages/404').default.component,
  500: require('~/error-pages/500').default.component,
};
