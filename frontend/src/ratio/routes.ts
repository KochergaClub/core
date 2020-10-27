import { Route } from '~/common/types';

export const confirmOrderRoute = (id: string): Route => ({
  href: `/rationality/confirm-order/[id]`,
  as: `/rationality/confirm-order/${id}`,
});

export const trainingAdminRoute = (slug: string): Route => ({
  href: `/team/ratio/training/[slug]`,
  as: `/team/ratio/training/${slug}`,
});
