import { createResourceBagFeature } from '~/redux/features';

import { ServerOrder } from '../types';

export const orderBagFeature = createResourceBagFeature<ServerOrder>({
  name: 'cm2/orderBag',
  endpoint: 'cm2/orders',
  paged: true,
});

export default orderBagFeature.slice;
