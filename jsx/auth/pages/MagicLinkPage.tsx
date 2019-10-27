import React, { useEffect } from 'react';

import { NextPage } from '~/common/types';
import { useAPI } from '~/common/hooks';

import Page from '~/components/Page';
import AuthContainer from '~/auth/components/AuthContainer';

interface Props {
  token: string;
  next: string;
}

const MagicLinkPage: NextPage<Props> = props => {
  const api = useAPI();

  useEffect(() => {
    async function login() {
      try {
        await api.call('auth/login', 'POST', {
          credentials: {
            token: props.token,
          },
          result: 'cookie',
        });
      } catch (e) {
        window.location.href = '/login';
      }
      // OK! Login didn't throw an exception -> we're in and have a cookie.
      window.location.href = props.next;
    }
    login();
  }, [api, props.next, props.token]);

  return (
    <Page title="Магическая ссылка" noMenu noFooter noAnalytics noVkWidget>
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

export default MagicLinkPage;
