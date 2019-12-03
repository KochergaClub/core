import { createSingletonResourceSlice } from '~/redux/slices/singleton-resource';

import { NowData } from './types';

export const nowDataSlice = createSingletonResourceSlice<NowData>({
  actionPrefix: '[now] DATA',
});
