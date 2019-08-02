import { API } from '~/common/api';

import { Shift } from './types';

export const getSchedule = async (
  api: API,
  from_date: string,
  to_date: string
) => {
  return (await api.call(
    `watchmen/schedule?from_date=${from_date}&to_date=${to_date}`,
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
