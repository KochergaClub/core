import { useEffect } from 'react';

import { withApollo, NextApolloPage } from '~/apollo';

import { Page } from '~/components';
import AuthContainer from '~/auth/components/AuthContainer';

import { useTokenLoginMutation } from '../queries.generated';
import CenteredLayout from '../components/CenteredLayout';

interface Props {
  token: string;
  next: string;
}

const MagicLinkPage: NextApolloPage<Props> = ({ token, next }) => {
  const [tokenLoginMutation] = useTokenLoginMutation();

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
