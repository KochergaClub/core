import { Route } from '~/common/types';

export const publicEventRoute = (id: string): Route => ({
  href: `/events/[id]`,
  as: `/events/${id}`,
});
