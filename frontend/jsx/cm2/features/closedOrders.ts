import { createSelector } from '@reduxjs/toolkit';
import { createPagedResourceFeature } from '~/redux/features';
import { AsyncAction } from '~/redux/store';

import { ServerOrder, parseServerOrder } from '../types';

import { orderBagFeature } from './orderBag';

const feature = createPagedResourceFeature<ServerOrder>({
  name: 'cm2/closedOrders',
  query: { status: 'closed', page_size: '5' },
  bag: orderBagFeature,
});

export const { loadPage: loadClosedOrders } = feature.thunks;

export const { pager: selectClosedOrdersPager } = feature.selectors;

export const reloadClosedOrders = (): AsyncAction => async (
  dispatch,
  getState
) => {
  const pager = selectClosedOrdersPager(getState());
  if (!pager) {
    return;
  }
  await dispatch(loadClosedOrders(pager.page));
};

export const selectClosedOrders = createSelector(
  feature.selectors.asList,
  serverOrders => (serverOrders ? serverOrders.map(parseServerOrder) : [])
);

export default feature.slice;
