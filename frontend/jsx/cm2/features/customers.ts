import { createPagedResourceFeature } from '~/redux/features';
import { apiThunk } from '~/redux/action-utils';

import { Customer, CreateCustomerParams } from '../types';
import { updateView } from './view';

import { customerBagFeature } from './customerBag';

const feature = createPagedResourceFeature<Customer>({
  name: 'cm2/customers',
  bag: customerBagFeature,
});

export const loadCustomers = () => feature.thunks.loadPage(1); // TODO - pager

export const selectCustomers = feature.selectors.asList;

export const addCustomer = (values: CreateCustomerParams) =>
  apiThunk(async (api, dispatch) => {
    await api.call('cm2/customer', 'POST', values);
    await dispatch(updateView());
  });

export default feature.slice;
