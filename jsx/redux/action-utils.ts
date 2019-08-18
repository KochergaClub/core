import { AnyAction } from 'redux';

import { selectAPI } from '~/core/selectors';

import { AsyncAction } from './store';

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
