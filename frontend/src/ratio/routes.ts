export const confirmOrderRoute = (id: string) =>
  `/rationality/confirm-order/${id}`;

export const adminTrainingRoute = (slug: string) =>
  `/team/ratio/training/${slug}`;

export const adminTrainingScheduleRoute = (slug: string) =>
  `/team/ratio/training/${slug}/schedule`;

export const adminTicketRoute = (id: string) => `/team/ratio/ticket/${id}`;
