import { AnyAction } from 'redux';

import { selectAPI } from '~/core/selectors';
import { API } from '~/common/api';

import { Dispatch, State, AsyncAction } from './store';

export const createLoadAction = <T>(
  url: string,
  postLoadAction: (data: T) => AnyAction
) => {
  const action = (): AsyncAction => async (dispatch, getState) => {
    const api = selectAPI(getState());
    const data = (await api.call(url, 'GET')) as T;
    dispatch(postLoadAction(data));
  };
  return action;
};

export const apiThunk = (
  body: (api: API, dispatch: Dispatch, getState: () => State) => Promise<void>
) => {
  return async (dispatch: Dispatch, getState: () => State) => {
    const api = selectAPI(getState());
    await body(api, dispatch, getState);
  };
};
