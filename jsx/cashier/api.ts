import { API } from '~/common/api';

import { Payment } from './types';

export const getPayments = async (api: API) => {
  return (await api.call('cashier/payment', 'GET')) as Payment[];
};
