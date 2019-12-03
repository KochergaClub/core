import { AsyncAction } from '~/redux/store';
import { selectAPI } from '~/core/selectors';

export const KKM_PASSWORD_SET = '[kkm] KKM_PASSWORD_SET';

const setKkmPassword = (password: string) => ({
  type: KKM_PASSWORD_SET as typeof KKM_PASSWORD_SET,
  payload: password,
});

export const loadKkmPassword = (): AsyncAction => async (
  dispatch,
  getState
) => {
  const api = selectAPI(getState());
  const password: string = (await api.call('cashier/kkm/password', 'GET'))
    .password;

  dispatch(setKkmPassword(password));
};

export type ActionTypes = ReturnType<typeof setKkmPassword>;
