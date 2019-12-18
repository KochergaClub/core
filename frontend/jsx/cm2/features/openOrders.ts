import { createPagedResourceFeature } from '~/redux/features';

import {
  ServerOrder,
  OrderAux,
  Customer,
  parseServerOrder,
  orderToOrderAux,
} from '../types';

import { orderBagFeature } from './orderBag';
import { customerBagFeature } from './customerBag';

const feature = createPagedResourceFeature<ServerOrder, OrderAux>({
  name: 'cm2/openOrders',
  query: { status: 'open' },
  bag: orderBagFeature,
  async loadRelated(orders: ServerOrder[], dispatch) {
    const customerIds = orders
      .map(order => order.customer)
      .filter(id => id) as number[];

    await dispatch(customerBagFeature.thunks.loadByIds(customerIds));
  },
  enhancers: [customerBagFeature.selectors.byId],
  enhance(serverOrders: ServerOrder[], customerById: (id: number) => Customer) {
    const orders = serverOrders.map(parseServerOrder);

    return orders.map(order => orderToOrderAux(order, customerById));
  },
});

export const {
  loadPage: loadOpenOrders,
  reload: reloadOpenOrders,
} = feature.thunks;

export const { asList: selectOpenOrders } = feature.selectors;

export const openOrdersFeature = feature;

export default feature.slice;
