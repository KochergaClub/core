import { Order, Customer, MyTicket, MySubscriptionStatus } from './types';

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

export const getEmailSubscriptionStatus = async (api: API) => {
  return (await api.call(
    'my/email/subscription_status',
    'GET'
  )) as MySubscriptionStatus;
};

export const callEmailAction = async (
  api: API,
  action: string
): Promise<void> => {
  await api.call(`my/email/${action}`, 'POST');
};

export const updateInterests = async (
  api: API,
  interest_ids: string[]
): Promise<void> => {
  await api.call(`my/email/update_interests`, 'POST', {
    interest_ids,
  });
  // TODO - return new subscription status (api already returns it)
};
