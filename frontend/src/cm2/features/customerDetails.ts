import { Selector, createSelector } from 'reselect';
import { createValueSlice } from '~/redux/slices/value';
import { State, AsyncAction } from '~/redux/store';

import { Customer } from '../types';

import { customerBagFeature } from './customerBag';

const slice = createValueSlice<number | null>({
  name: 'cm2/customerDetails',
  initialState: null,
});

export const loadCustomerDetails = (
  customer_id: number
): AsyncAction => async dispatch => {
  await dispatch(customerBagFeature.thunks.loadByIds([customer_id]));

  dispatch(slice.actions.set(customer_id));
};

export const selectCustomerDetails: Selector<
  State,
  Customer | null
> = createSelector(
  [slice.selectors.self, customerBagFeature.selectors.byId],
  (state, customerById) => {
    if (state === null) {
      return null;
    }
    return customerById(state);
  }
);

export default slice;
