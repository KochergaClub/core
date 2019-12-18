import { createSelector, Selector } from 'reselect';
import { createValueSlice } from '~/redux/slices/value';
import { apiThunk } from '~/redux/action-utils';
import { State } from '~/redux/store';

import {
  ServerOrder,
  OrderAux,
  parseServerOrder,
  orderToOrderAux,
} from '../types';
import { selectCustomersAsObject } from './customers';

const slice = createValueSlice<ServerOrder | null>({
  name: 'cm2/orderDetails',
  initialState: null,
});

export const loadOrderDetails = (order_id: number) =>
  apiThunk(async (api, dispatch) => {
    const order = (await api.call(
      `cm2/orders/${order_id}`,
      'GET'
    )) as ServerOrder;

    dispatch(slice.actions.set(order));
  });

export const selectOrderDetails: Selector<State, OrderAux> = createSelector(
  [slice.selectors.self, selectCustomersAsObject],
  (serverOrder, customersObject) => {
    if (serverOrder === null) {
      throw new Error("Can't select order details - none is being viewed");
    }
    const order = parseServerOrder(serverOrder);

    return orderToOrderAux(order, customersObject);
  }
);

export default slice;
