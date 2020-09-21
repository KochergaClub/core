import { useEffect } from 'react';

import { useMutation } from '@apollo/client';

import { NextApolloPage, withApollo } from '~/apollo';
import AuthContainer from '~/auth/components/AuthContainer';
import { Page } from '~/components';

import CenteredLayout from '../components/CenteredLayout';
import { TokenLoginDocument } from '../queries.generated';

interface Props {
  token: string;
  next: string;
}

const MagicLinkPage: NextApolloPage<Props> = ({ token, next }) => {
  const [tokenLoginMutation] = useMutation(TokenLoginDocument);

  useEffect(() => {
    async function login() {
      const { data } = await tokenLoginMutation({
        variables: {
          token,
        },
      });

      if (!data?.result?.user?.is_authenticated) {
        window.location.href = '/login';
      }

      // OK! Login didn't throw an exception -> we're in and have a cookie.
      window.location.href = next;
    }
    login();
  }, [tokenLoginMutation, next, token]);

  return (
    <Page title="Магическая ссылка" chrome="none" noAnalytics>
      <CenteredLayout>
        <AuthContainer>Проверяем доступ...</AuthContainer>
      </CenteredLayout>
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
