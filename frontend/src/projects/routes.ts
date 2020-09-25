import { Route } from '~/common/types';

export const projectRoute = (slug: string): Route => ({
  href: `/[...slug]`,
  as: `/projects/${slug}`,
});
