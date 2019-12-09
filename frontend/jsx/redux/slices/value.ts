import { PayloadAction } from '@reduxjs/toolkit';
import { createExtendedSlice } from './utils';

export function createValueSlice<T>({
  name,
  initialState,
}: {
  name: string;
  initialState: T;
}) {
  return createExtendedSlice({
    name,
    initialState,
    reducers: {
      set: (_, action: PayloadAction<T>) => action.payload,
    },
  });
}
