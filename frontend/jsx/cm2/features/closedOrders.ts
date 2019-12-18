import { createSelector } from '@reduxjs/toolkit';
import { createPagedResourceFeature } from '~/redux/features';

import { ServerOrder, parseServerOrder } from '../types';

import { orderBagFeature } from './orderBag';

const feature = createPagedResourceFeature<ServerOrder>({
  name: 'cm2/closedOrders',
  query: { status: 'closed' },
  bag: orderBagFeature,
});

export const loadClosedOrders = () => feature.thunks.loadPage(1);

export const selectClosedOrders = createSelector(
  feature.selectors.asList,
  serverOrders => (serverOrders ? serverOrders.map(parseServerOrder) : [])
);

export default feature.slice;
