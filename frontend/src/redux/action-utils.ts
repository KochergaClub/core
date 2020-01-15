import { selectAPI } from '~/core/selectors';
import { API } from '~/common/api';

import { Dispatch, State } from './store';

export const apiThunk = (
  body: (api: API, dispatch: Dispatch, getState: () => State) => Promise<void>
) => {
  return async (dispatch: Dispatch, getState: () => State) => {
    const api = selectAPI(getState());
    await body(api, dispatch, getState);
  };
};
