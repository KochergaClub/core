import { createSelector } from 'reselect';
import { createPagedResourceFeature } from '~/redux/features';
import { apiThunk } from '~/redux/action-utils';

import { Customer, CreateCustomerParams, CustomersObject } from '../types';
import { updateView } from './view';

const feature = createPagedResourceFeature<Customer>({
  name: 'cm2/customers',
  endpoint: 'cm2/customer',
});

export const loadCustomers = () => feature.thunks.loadPage(1); // TODO - pager

export const selectCustomers = feature.selectors.asList;

export const selectCustomersAsObject = createSelector(
  selectCustomers,
  customers => {
    const result = {} as CustomersObject;
    for (const customer of customers) {
      result[customer.id] = customer;
    }
    return result;
  }
);

export const addCustomer = (values: CreateCustomerParams) =>
  apiThunk(async (api, dispatch) => {
    await api.call('cm2/customer', 'POST', values);
    await dispatch(updateView());
  });

export default feature.slice;
