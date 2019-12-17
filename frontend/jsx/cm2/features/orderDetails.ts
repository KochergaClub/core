import { createValueSlice } from '~/redux/slices/value';
import { apiThunk } from '~/redux/action-utils';
import { State } from '~/redux/store';

import { ServerOrder, Order, parseServerOrder } from '../types';

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

export const selectOrderDetails = (state: State): Order => {
  const serverOrder = slice.selectors.self(state);
  if (serverOrder === null) {
    throw new Error("Can't select order details - none is being viewed");
  }

  return parseServerOrder(serverOrder);
};

export default slice;
