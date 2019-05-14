import { Order, Customer, MyTicket } from './types';

import { API } from '~/common/api';

export const getOrders = async (api: API) => {
  return (await api.call('cm/me/orders', 'GET')) as Order[];
};

export const getCmData = async (api: API) => {
  const result = (await api.call('cm/me', 'GET')) as {
    customer: Customer;
    orders_count: number;
  };
  return result;
};

export const getTickets = async (api: API) => {
  return (await api.call('my/tickets', 'GET')) as MyTicket[];
};
