import { API } from '~/common/api';

import { Cohort, User, Group } from './types';

export const getCohorts = async (api: API) => {
  return (await api.call('mastermind_dating/cohort', 'GET')) as Cohort[];
};

export const getCohort = async (api: API, id: number) => {
  return (await api.call(`mastermind_dating/cohort/${id}`, 'GET')) as Cohort;
};

export const getCohortUsers = async (api: API, cohort_id: number) => {
  return (await api.call(
    `mastermind_dating/cohort/${cohort_id}/users`,
    'GET'
  )) as User[];
};

export const getCohortGroups = async (api: API, cohort_id: number) => {
  return (await api.call(
    `mastermind_dating/cohort/${cohort_id}/groups`,
    'GET'
  )) as Group[];
};
