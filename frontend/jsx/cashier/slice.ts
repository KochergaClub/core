import { createResourceSlice } from '~/redux/slices-old/resource';

import { Payment } from './types';

export default createResourceSlice<Payment>({
  url: 'cashier/payment',
  actionPrefix: '[cashier] PAYMENT',
});
