import { createValueSlice } from '~/redux/slices/value';
import { apiThunk } from '~/redux/action-utils';

import { Customer } from '../types';

const slice = createValueSlice<Customer | null>({
  name: 'cm2/customerDetails',
  initialState: null,
});

export const loadCustomerDetails = (customer_id: number) =>
  apiThunk(async (api, dispatch) => {
    const customer = (await api.call(
      `cm2/customer/${customer_id}`,
      'GET'
    )) as Customer;

    dispatch(slice.actions.set(customer));
  });

export const selectCustomerDetails = slice.selectors.self;

export default slice;
