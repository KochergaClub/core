import { createSelector, Selector } from 'reselect';

import { createPagedResourceFeature } from '~/redux/features';
import { State } from '~/redux/store';

import {
  ServerOrder,
  OrderAux,
  parseServerOrder,
  orderToOrderAux,
} from '../types';
import { selectCustomersAsObject } from './customers';

const feature = createPagedResourceFeature<ServerOrder>({
  name: 'cm2/openOrders',
  endpoint: 'cm2/orders?status=open',
});

export const loadOpenOrders = () => feature.thunks.loadPage(1); // TODO - pager

export const selectOpenOrders: Selector<State, OrderAux[]> = createSelector(
  [feature.selectors.asList, selectCustomersAsObject],
  (serverOrders, customersObject) => {
    if (!serverOrders) {
      return [];
    }

    const orders = serverOrders.map(parseServerOrder);

    return orders.map(order => orderToOrderAux(order, customersObject));
  }
);

export default feature.slice;
