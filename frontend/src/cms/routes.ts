import { Route } from '~/common/types';

export const cmsRoute = (url: string): Route => {
  if (url === '/') {
    return {
      href: '/',
      as: '/',
    };
  } else {
    return {
      href: '/[...slug]',
      as: url,
    };
  }
};
