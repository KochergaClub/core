import { createValueSlice } from '~/redux/slices/value';
import { apiThunk } from '~/redux/action-utils';

import { CreateOrderParams } from '../types';
import { updateView } from './view';

const slice = createValueSlice<null>({
  name: 'cm2/orderActions',
  initialState: null,
});

export const addOrder = (values: CreateOrderParams) =>
  apiThunk(async (api, dispatch) => {
    await api.call('cm2/orders', 'POST', values);
    await dispatch(updateView());
  });

export const closeOrder = (order_id: number) =>
  apiThunk(async (api, dispatch) => {
    await api.call(`cm2/orders/${order_id}/close`, 'POST');
    await dispatch(updateView());
  });

export default slice;
