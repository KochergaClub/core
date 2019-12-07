import { PayloadAction, createSelector } from '@reduxjs/toolkit';

import { format, parseISO } from 'date-fns';

import { createExtendedSlice } from '~/redux/slices/utils';

type WindowState = [string, string];

const windowSlice = createExtendedSlice({
  name: 'watchmen/datesWindow',
  initialState: ['2018-12-31', '2019-01-27'] as WindowState,
  reducers: {
    set: {
      prepare: (from_date: Date, to_date: Date) => ({
        payload: [
          format(from_date, 'yyyy-MM-dd'),
          format(to_date, 'yyyy-MM-dd'),
        ] as WindowState,
      }),
      reducer: (_, action: PayloadAction<WindowState>) => action.payload,
    },
  },
});

export default windowSlice;

export const selectDatesWindow = createSelector(
  windowSlice.selectors.self,
  w => {
    const from_date = parseISO(w[0]);
    const to_date = parseISO(w[1]);

    return [from_date, to_date] as [Date, Date];
  }
);

export const { set: setDatesWindow } = windowSlice.actions;
