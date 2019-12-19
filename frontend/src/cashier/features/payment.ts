import { createResourceFeature } from '~/redux/features';

import { apiThunk } from '~/redux/action-utils';

import { Payment, CreatePaymentParams } from '../types';

const feature = createResourceFeature<Payment>({
  name: 'cashier/payment',
  endpoint: 'cashier/payment',
});

export const loadPayments = feature.thunks.load;

export const addPayment = (values: CreatePaymentParams) =>
  apiThunk(async (api, dispatch) => {
    await api.call('cashier/payment', 'POST', values);
    await dispatch(loadPayments());
  });

export const selectPayments = feature.selectors.asList;

export default feature.slice;
