import { useEffect } from 'react';

import { withApollo } from '~/apollo/client';
import { NextPage } from '~/common/types';

import { Page } from '~/components';
import AuthContainer from '~/auth/components/AuthContainer';

import { useTokenLoginMutation } from '../queries.generated';

interface Props {
  token: string;
  next: string;
}

const MagicLinkPage: NextPage<Props> = props => {
  const [tokenLoginMutation] = useTokenLoginMutation();

  useEffect(() => {
    async function login() {
      const { data } = await tokenLoginMutation({
        variables: {
          token: props.token,
        },
      });

      if (!data?.result?.user?.is_authenticated) {
        window.location.href = '/login';
      }

      // OK! Login didn't throw an exception -> we're in and have a cookie.
      window.location.href = props.next;
    }
    login();
  }, [tokenLoginMutation, props.next, props.token]);

  return (
    <Page title="Магическая ссылка" chrome="none" noAnalytics noVkWidget>
      <AuthContainer>Проверяем доступ...</AuthContainer>
    </Page>
  );
};

MagicLinkPage.getInitialProps = async ({ query }) => {
  if (!query.token) {
    throw new Error('expected token');
  }
  return {
    token: query.token as string,
    next: (query.next as string) || '/my',
  };
};

export default withApollo(MagicLinkPage);
