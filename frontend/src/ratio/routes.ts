import { Tab } from './components/trainings/AdminRatioTraining';

export const confirmOrderRoute = (id: string) =>
  `/rationality/confirm-order/${id}`;

export const adminTrainingRoute = (slug: string) =>
  `/team/ratio/training/${slug}`;

export const adminTrainingTabRoute = (slug: string, tab: Tab) => {
  if (tab === 'info') {
    return `/team/ratio/training/${slug}`;
  } else {
    return `/team/ratio/training/${slug}/${tab}`;
  }
};

export const adminTrainingScheduleRoute = (slug: string) =>
  `/team/ratio/training/${slug}/schedule`;

export const adminTicketRoute = (id: string) => `/team/ratio/ticket/${id}`;
