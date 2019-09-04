import { createSelector, Selector } from 'reselect';

import { State } from '~/redux/store';

import { nowDataSlice as slice } from './slices';
import { NowData } from './types';

const selectApp: Selector<State, ReturnType<typeof slice.reducer>> = state =>
  state.now;

export const selectNowData: Selector<State, NowData | null> = createSelector(
  selectApp,
  slice.selectors.selectData
);

export default slice.reducer;
