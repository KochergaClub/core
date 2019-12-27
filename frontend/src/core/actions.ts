import { APIProps } from '~/common/api';
import { AsyncAction } from '~/redux/store';
import { User } from '~/common/types';
import { selectAPI } from './selectors';

export const API_CONFIGURE = '[core] API_CONFIGURE';
export const API_CLEANUP_FOR_CLIENT = '[core] API_CLEANUP_FOR_CLIENT';
export const USER_LOADED = '[core] USER_LOADED';

export const configureAPI = (props: APIProps) => ({
  type: API_CONFIGURE as typeof API_CONFIGURE,
  payload: props,
});

export const cleanupAPIForClient = () => ({
  type: API_CLEANUP_FOR_CLIENT as typeof API_CLEANUP_FOR_CLIENT,
});

export const loadedUser = (user: User) => ({
  type: USER_LOADED as typeof USER_LOADED,
  payload: user,
});

export const loadUser = (): AsyncAction<void> => async (dispatch, getState) => {
  const api = selectAPI(getState());
  const user = await api.call('me', 'GET');

  dispatch(loadedUser(user));
};

export type Action =
  | ReturnType<typeof configureAPI>
  | ReturnType<typeof cleanupAPIForClient>
  | ReturnType<typeof loadedUser>;
