import { createPagedResourceFeature } from '~/redux/features';
import { apiThunk } from '~/redux/action-utils';

import { Customer, CreateCustomerParams } from '../types';

import { customerBagFeature } from './customerBag';

const feature = createPagedResourceFeature<Customer>({
  name: 'cm2/customers',
  bag: customerBagFeature,
  enhancers: [],
  enhance: items => items,
});

export const {
  loadPage: loadCustomers,
  reload: reloadCustomers,
} = feature.thunks;

export const { asList: selectCustomers } = feature.selectors;

export const addCustomer = (values: CreateCustomerParams) =>
  apiThunk(async (api, dispatch) => {
    await api.call('cm2/customer', 'POST', values);
    await dispatch(feature.thunks.reload());
  });

export const customersFeature = feature;

export default feature.slice;
