import { API } from '~/common/api';

import { Payment, CreatePaymentParams } from './types';

export const getPayments = async (api: API) => {
  return (await api.call('cashier/payment', 'GET')) as Payment[];
};

export const createPayment = async (api: API, params: CreatePaymentParams) => {
  await api.call('cashier/payment', 'POST', params);
};
