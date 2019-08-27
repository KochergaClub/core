import slice from './slice';

import { createSelector, Selector } from 'reselect';

import { State } from '~/redux/store';

import { Payment } from './types';

const selectSlice: Selector<State, ReturnType<typeof slice.reducer>> = state =>
  state.cashier;

export const selectPayments: Selector<State, Payment[]> = createSelector(
  selectSlice,
  slice.selectors.selectAll
);
