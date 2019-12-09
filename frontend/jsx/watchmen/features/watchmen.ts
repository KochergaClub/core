import { createSelector } from '@reduxjs/toolkit';

import { createResourceFeature } from '~/redux/features';

import { State } from '~/redux/store';
import { apiThunk } from '~/redux/action-utils';

import { patchWatchman } from '../api';
import { Watchman } from '../types';

const feature = createResourceFeature<Watchman>({
  name: 'watchmen/watchmen',
  endpoint: 'watchmen/watchmen',
});

export const loadWatchmen = feature.thunks.load;

export const selectAllWatchmen = feature.selectors.asList;

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

export const setWatchmanPriority = (watchman: Watchman, priority: number) =>
  apiThunk(async (api, dispatch) => {
    await patchWatchman(api, watchman, {
      priority,
    });
    await dispatch(loadWatchmen());
  });

export default feature.slice;
