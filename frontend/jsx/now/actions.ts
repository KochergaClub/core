import { createLoadAction } from '~/redux/action-utils';

import { nowDataSlice } from './slices';

export const loadNowData = createLoadAction(
  'people/now',
  nowDataSlice.actions.replace
);
