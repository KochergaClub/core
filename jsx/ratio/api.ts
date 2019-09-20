import { API } from '~/common/api';

import { Training, ActivityType, Ticket } from './types';

export const getSchedule = async (api: API, slug: string) => {
  return (await api.call(
    `ratio/training/${slug}/schedule`,
    'GET'
  )) as ActivityType[];
};

export const copyScheduleFrom = async (
  api: API,
  training: Training,
  srcTraining: Training
) => {
  await api.call(`ratio/training/${training.slug}/copy_schedule_from`, 'POST', {
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

export const setTicketFiscalizationStatus = async (
  api: API,
  ticket_id: number,
  fiscalization_status: Ticket['fiscalization_status']
) => {
  await api.call(`ratio/ticket/${ticket_id}`, 'PATCH', {
    fiscalization_status,
  });
};
