import { createSelector, Selector } from 'reselect';
import { createValueSlice } from '~/redux/slices/value';
import { State, AsyncAction } from '~/redux/store';

import { OrderAux, parseServerOrder } from '../types';

import { orderBagFeature } from './orderBag';
import { customerBagFeature } from './customerBag';

const slice = createValueSlice<number | null>({
  name: 'cm2/orderDetails',
  initialState: null,
});

export const loadOrderDetails = (order_id: number): AsyncAction => async (
  dispatch,
  getState
) => {
  await dispatch(orderBagFeature.thunks.loadByIds([order_id]));
  const order = orderBagFeature.selectors.byId(getState())(order_id);

  if (order.customer) {
    await dispatch(customerBagFeature.thunks.loadByIds([order.customer]));
  }

  dispatch(slice.actions.set(order_id));
};

export const selectOrderDetails: Selector<State, OrderAux> = createSelector(
  [
    slice.selectors.self,
    orderBagFeature.selectors.byId,
    customerBagFeature.selectors.byId,
  ],
  (order_id, orderById, customerById) => {
    if (order_id === null) {
      throw new Error("Can't select order details - none is being viewed");
    }
    const order = parseServerOrder(orderById(order_id));

    const orderAux: OrderAux = { order };
    if (order.customer) {
      const customer = customerById(order.customer);
      orderAux.customer = customer;
    }

    return orderAux;
  }
);

export default slice;
