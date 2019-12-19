import { createOrderFeature } from './utils';

const feature = createOrderFeature({
  name: 'cm2/openOrders',
  query: { status: 'open' },
});

export const {
  loadPage: loadOpenOrders,
  reload: reloadOpenOrders,
} = feature.thunks;

export const { asList: selectOpenOrders } = feature.selectors;

export const openOrdersFeature = feature;

export default feature.slice;
