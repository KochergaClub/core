import { API } from '~/common/api';

import { Training, ActivityType, Ticket, Trainer } from './types';

export const getTrainings = async (api: API) => {
  return (await api.call('ratio/training', 'GET')) as Training[];
};

// TODO - change api to accept slug
const trainingNameToKey = (trainingName: string) =>
  encodeURIComponent(trainingName);
export const trainingToKey = (training: Training) =>
  trainingNameToKey(training.name);

export const getTraining = async (api: API, name: string) => {
  const key = trainingNameToKey(name);
  return (await api.call(`ratio/training/${key}`, 'GET')) as Training;
};

export const getTickets = async (api: API, name: string) => {
  const key = trainingNameToKey(name);
  return (await api.call(`ratio/training/${key}/tickets`, 'GET')) as Ticket[];
};

export const getTrainers = async (api: API) => {
  return (await api.call(`ratio/trainers`, 'GET')) as Trainer[];
};

export const getSchedule = async (api: API, name: string) => {
  const key = trainingNameToKey(name);
  return (await api.call(
    `ratio/training/${key}/schedule`,
    'GET'
  )) as ActivityType[];
};

export const copyScheduleFrom = async (
  api: API,
  training: Training,
  srcTraining: Training
) => {
  const key = trainingToKey(training);
  await api.call(`ratio/training/${key}/copy_schedule_from`, 'POST', {
    src_training_slug: srcTraining.slug,
  });
};

export const setTrainerForActivity = async (
  api: API,
  activity_id: number,
  trainer: string
) => {
  await api.call(`ratio/activity/${activity_id}/set_trainer`, 'POST', {
    name: trainer,
  });
};

export const unsetTrainerForActivity = async (
  api: API,
  activity_id: number
) => {
  await api.call(`ratio/activity/${activity_id}/unset_trainer`, 'POST');
};
