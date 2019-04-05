import * as React from 'react';

import { Action } from './types';

type EventDispatchShape = (a: Action) => void;

export const EventDispatch = React.createContext<EventDispatchShape | null>(
  null
);
