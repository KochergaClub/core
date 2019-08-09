import { API } from '~/common/api';

import { format } from 'date-fns';

import { Shift } from './types';

export const getSchedule = async (api: API, from_date: Date, to_date: Date) => {
  const from_date_str = format(from_date, 'yyyy-MM-dd');
  const to_date_str = format(to_date, 'yyyy-MM-dd');
  return (await api.call(
    `watchmen/schedule?from_date=${from_date_str}&to_date=${to_date_str}`,
    'GET'
  )) as Shift[];
};

export const updateShift = async (api: API, shift: Shift) => {
  const updateUrl = `watchmen/schedule/${shift.date}/${shift.shift}`;
  await api.call(updateUrl, 'PUT', {
    watchman: shift.watchman ? shift.watchman.short_name : '',
    is_night: shift.is_night,
  });
};
