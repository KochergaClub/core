import { createSelector } from '@reduxjs/toolkit';
import { createPagedResourceFeature } from '~/redux/features';

import { ServerOrder, parseServerOrder } from '../types';

const feature = createPagedResourceFeature<ServerOrder>({
  name: 'cm2/openOrders',
  endpoint: 'cm2/orders?status=open',
});

export const loadOpenOrders = () => feature.thunks.loadPage(1); // TODO - pager

export const selectOpenOrders = createSelector(
  feature.selectors.asList,
  serverOrders => (serverOrders ? serverOrders.map(parseServerOrder) : [])
);

export default feature.slice;
