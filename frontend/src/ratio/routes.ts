import { Route } from '~/common/types';

export const confirmOrderRoute = (id: string): Route => ({
  href: `/rationality/confirm-order/[id]`,
  as: `/rationality/confirm-order/${id}`,
});
