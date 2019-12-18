import { createSelector, Selector } from 'reselect';

import { createPagedResourceFeature } from '~/redux/features';
import { State, AsyncAction } from '~/redux/store';

import {
  ServerOrder,
  OrderAux,
  parseServerOrder,
  orderToOrderAux,
} from '../types';

import { orderBagFeature } from './orderBag';
import { customerBagFeature } from './customerBag';

const feature = createPagedResourceFeature<ServerOrder>({
  name: 'cm2/openOrders',
  query: { status: 'open' },
  bag: orderBagFeature,
});

export const loadOpenOrders = (): AsyncAction => async (dispatch, getState) => {
  await dispatch(feature.thunks.loadPage(1)); // TODO - pager

  const customerIds = feature.selectors
    .asList(getState())
    .map(order => order.customer)
    .filter(id => id) as number[];

  await dispatch(customerBagFeature.thunks.loadByIds(customerIds));
};

export const selectOpenOrders: Selector<State, OrderAux[]> = createSelector(
  [feature.selectors.asList, customerBagFeature.selectors.byId],
  (serverOrders, customerById) => {
    if (!serverOrders) {
      return [];
    }

    const orders = serverOrders.map(parseServerOrder);

    return orders.map(order => orderToOrderAux(order, customerById));
  }
);

export default feature.slice;
