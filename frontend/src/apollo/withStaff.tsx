import { requireAuth } from '~/auth/utils';

import { NextApolloPage } from './types';

export function withStaff<P extends {}, IP = P>(
  PageComponent: NextApolloPage<P, IP>
) {
  const WithStaff: NextApolloPage<P, IP> = (pageProps) => (
    <PageComponent {...pageProps} />
  );

  WithStaff.getInitialProps = async (ctx) => {
    const { apolloClient } = ctx;

    await requireAuth(apolloClient, { is_staff: true });

    // Run wrapped getInitialProps methods
    if (PageComponent.getInitialProps) {
      return await PageComponent.getInitialProps(ctx);
    }
    return {} as any; // sorry!
  };

  return WithStaff;
}
