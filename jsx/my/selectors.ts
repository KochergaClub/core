import { TabName } from './actions';
import { Customer, Order, MyTicket } from './types';
import { State } from '~/redux/store';

export const selectTab = (state: State): TabName => state.my.ui.tab;

export const selectCustomer = (state: State): Customer | undefined =>
  state.my.cm ? state.my.cm.customer : undefined;

export const selectOrders = (state: State): Order[] | undefined =>
  state.my.cm ? state.my.cm.orders : undefined;

export const selectOrdersCount = (state: State): number | undefined =>
  state.my.cm ? state.my.cm.orders_count : undefined;

export const selectTickets = (state: State): MyTicket[] =>
  state.my.tickets || [];
