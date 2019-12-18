import { createPagedResourceFeature } from '~/redux/features';

import { ServerOrder, Order, parseServerOrder } from '../types';

import { orderBagFeature } from './orderBag';

const feature = createPagedResourceFeature<ServerOrder, Order>({
  name: 'cm2/closedOrders',
  query: { status: 'closed' },
  bag: orderBagFeature,
  enhancers: [],
  enhance(serverOrders: ServerOrder[]) {
    return serverOrders.map(parseServerOrder);
  },
});

export const {
  loadPage: loadClosedOrders,
  reload: reloadClosedOrders,
} = feature.thunks;

export const {
  pager: selectClosedOrdersPager,
  asList: selectClosedOrders,
} = feature.selectors;

export const closedOrdersFeature = feature;

export default feature.slice;
