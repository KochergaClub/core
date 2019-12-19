import { createOrderFeature } from './utils';

const feature = createOrderFeature({
  name: 'cm2/closedOrders',
  query: { status: 'closed', ordering: '-id' },
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
