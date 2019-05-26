import * as React from 'react';

import { Dispatch } from './reducers';

type ZadarmaContextShape = Dispatch;

export const ZadarmaContext = React.createContext<ZadarmaContextShape>(
  () => null
);
