import { API } from '~/common/api';

import { Member } from './types';

export const getMembers = async (api: API) => {
  return (await api.call('staff/member', 'GET')) as Member[];
};

export const getMember = async (api: API, id: number) => {
  return (await api.call(`staff/member/${id}`, 'GET')) as Member;
};
