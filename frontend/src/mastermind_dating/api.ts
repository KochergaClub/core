import { API } from '~/common/api';

import { Cohort, Participant, Group } from './types';

export const getCohort = async (api: API, id: number) => {
  return (await api.call(`mastermind_dating/cohort/${id}`, 'GET')) as Cohort;
};

export const getCohortParticipants = async (api: API, cohort_id: number) => {
  return (await api.call(
    `mastermind_dating/cohort/${cohort_id}/participants`,
    'GET'
  )) as Participant[];
};

export const getCohortGroups = async (api: API, cohort_id: number) => {
  return (await api.call(
    `mastermind_dating/cohort/${cohort_id}/groups`,
    'GET'
  )) as Group[];
};
