import { API, APIError } from '~/common/api';
import { AsyncAction } from '~/redux/store';
import { getCmData, getOrders, getTickets } from './api';
import { Order, Customer, MyTicket } from './types';

export const TAB_OPEN = '[my] TAB_OPEN';
export const CM_DATA_LOADED = '[my] CM_DATA_LOADED';
export const TICKETS_LOADED = '[my] TICKETS_LOADED';

export type TabName = string; // TODO - const strings?

export const openTab = (name: TabName) => ({
  type: TAB_OPEN as typeof TAB_OPEN,
  payload: name,
});

const cmDataLoaded = (
  customer: Customer,
  orders_count: number,
  orders: Order[]
) => ({
  type: CM_DATA_LOADED as typeof CM_DATA_LOADED,
  payload: {
    customer,
    orders_count,
    orders,
  },
});

const ticketsLoaded = (tickets: MyTicket[]) => ({
  type: TICKETS_LOADED as typeof TICKETS_LOADED,
  payload: tickets,
});

export const loadCmData = (api: API): AsyncAction<void> => async dispatch => {
  try {
    const { customer, orders_count } = await getCmData(api);
    const orders = await getOrders(api);
    dispatch(cmDataLoaded(customer, orders_count, orders));
  } catch (e) {
    if (e instanceof APIError && e.status === 404) {
      // that's ok, not all users are registered in CM
    } else {
      throw e;
    }
  }
};

export const loadTickets = (api: API): AsyncAction<void> => async dispatch => {
  const tickets = await getTickets(api);
  dispatch(ticketsLoaded(tickets));
};

export type Action =
  | ReturnType<typeof openTab>
  | ReturnType<typeof cmDataLoaded>
  | ReturnType<typeof ticketsLoaded>;
