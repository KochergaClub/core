import slice from './slice';

import { createSelector, Selector } from 'reselect';

import { State } from '~/redux/store';

import { ImageTemplate } from './types';

const selectSlice: Selector<State, ReturnType<typeof slice.reducer>> = state =>
  state.imageTemplater;

export const selectTemplates: Selector<State, ImageTemplate[]> = createSelector(
  selectSlice,
  slice.selectors.selectAll
);

export const selectViewingTemplate: Selector<
  State,
  ImageTemplate | undefined
> = createSelector(
  selectSlice,
  slice.selectors.selectViewing
);
