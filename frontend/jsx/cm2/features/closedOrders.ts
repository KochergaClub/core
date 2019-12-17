import { createSelector } from '@reduxjs/toolkit';
import { createPagedResourceFeature } from '~/redux/features';

import { ServerOrder, parseServerOrder } from '../types';

const feature = createPagedResourceFeature<ServerOrder>({
  name: 'cm2/closedOrders',
  endpoint: 'cm2/orders?status=closed',
});

export const loadClosedOrders = () => feature.thunks.loadPage(1);

export const selectClosedOrders = createSelector(
  feature.selectors.asList,
  serverOrders => (serverOrders ? serverOrders.map(parseServerOrder) : [])
);

export default feature.slice;
