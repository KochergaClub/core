import { requireAuth } from '~/auth/utils';

import { NextApolloPage } from './types';

export function withStaff<T extends {}>(PageComponent: NextApolloPage<T, any>) {
  const WithStaff: NextApolloPage<T, any> = pageProps => (
    <PageComponent {...pageProps} />
  );

  WithStaff.getInitialProps = async ctx => {
    const { apolloClient } = ctx;

    await requireAuth(apolloClient, { is_staff: true });

    // Run wrapped getInitialProps methods
    if (PageComponent.getInitialProps) {
      return await PageComponent.getInitialProps(ctx);
    }
    return {};
  };

  return WithStaff;
}
