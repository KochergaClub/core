import { API } from '~/common/api';

import { format } from 'date-fns';

import { Shift, Watchman, Grade } from './types';

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
    watchman_id: shift.watchman ? shift.watchman.id : null,
    is_night: shift.is_night,
  });
};

export const getWatchmen = async (api: API) => {
  return (await api.call('watchmen/watchmen', 'GET')) as Watchman[];
};

export const getGrades = async (api: API) => {
  return (await api.call('watchmen/grades', 'GET')) as Grade[];
};

export const patchWatchman = async (
  api: API,
  watchman: Watchman,
  patch: { grade_id?: number; priority?: number }
) => {
  await api.call(`watchmen/watchmen/${watchman.id}`, 'PATCH', patch);
};

export interface AddWatchmanProps {
  full_name: string;
  short_name: string;
  email: string;
  password: string;
  vk: string;
  gender: 'MALE' | 'FEMALE';
}

export const addWatchman = async (api: API, props: AddWatchmanProps) => {
  await api.call(`staff/member/add_watchman`, 'POST', props);
};