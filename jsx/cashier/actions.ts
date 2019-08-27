import { AsyncAction } from '~/redux/store';
import { selectAPI } from '~/core/selectors';

import slice from './slice';
import { CreatePaymentParams } from './types';

export const loadPayments = slice.actions.loadAll;

export const addPayment = (values: CreatePaymentParams): AsyncAction => async (
  dispatch,
  getState
) => {
  const api = selectAPI(getState());

  await api.call('cashier/payment', 'POST', values);
  await dispatch(loadPayments());
};
