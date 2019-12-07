import { createSingletonResourceSlice } from '~/redux/slices-old/singleton-resource';

import { NowData } from './types';

export const nowDataSlice = createSingletonResourceSlice<NowData>({
  actionPrefix: '[now] DATA',
});
