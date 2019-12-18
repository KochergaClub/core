import { createResourceBagFeature } from '~/redux/features';

import { Customer } from '../types';

export const customerBagFeature = createResourceBagFeature<Customer>({
  name: 'cm2/customerBag',
  endpoint: 'cm2/customer',
  paged: true,
});

export default customerBagFeature.slice;
