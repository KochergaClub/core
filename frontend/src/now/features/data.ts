import { createValueSlice } from '~/redux/slices/value';
import { createLoadAction } from '~/redux/action-utils';

import { NowData } from '../types';

const slice = createValueSlice<NowData | null>({
  name: 'now/data',
  initialState: null,
});

export const loadNowData = createLoadAction('people/now', slice.actions.set);

export const selectNowData = slice.selectors.self;

export default slice;
