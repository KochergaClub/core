import { createSelector } from 'reselect';

import { API } from '~/common/api';
import { State } from '~/redux/store';

export const selectAPI = createSelector(
  (state: State) => state.core.api,
  api => {
    if (!api) {
      throw new Error('API is not configured');
    }
    return new API(api);
  }
);
