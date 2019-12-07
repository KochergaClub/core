import { createSelector } from '@reduxjs/toolkit';

import { createValueSlice } from '~/redux/slices/value';
import { AsyncAction, State } from '~/redux/store';
import { selectAPI } from '~/core/selectors';

import { getWatchmen, patchWatchman } from '../api';
import { Watchman } from '../types';

const watchmenSlice = createValueSlice({
  name: 'watchmen/watchmen',
  initialState: [] as Watchman[],
});

export default watchmenSlice;

export const selectAllWatchmen = watchmenSlice.selectors.self;

// current only
export const selectWatchmen = createSelector(selectAllWatchmen, watchmen =>
  watchmen.filter(w => w.is_current)
);

// only current and with priority 1 or 2
export const selectActiveWatchmen = createSelector(selectWatchmen, watchmen =>
  [...watchmen]
    .filter(w => w.priority <= 2)
    .sort((a, b) => a.priority - b.priority)
);

export const selectWatchmanById = (
  state: State,
  id: number
): Watchman | undefined => state.watchmen.watchmen.find(w => w.id === id);

export const loadWatchmen = (): AsyncAction => async (dispatch, getState) => {
  const api = selectAPI(getState());
  const watchmen = await getWatchmen(api);
  dispatch(watchmenSlice.actions.set(watchmen));
};

export const setWatchmanPriority = (
  watchman: Watchman,
  priority: number
): AsyncAction => async (dispatch, getState) => {
  const api = selectAPI(getState());
  await patchWatchman(api, watchman, {
    priority,
  });
  await dispatch(loadWatchmen());
};
