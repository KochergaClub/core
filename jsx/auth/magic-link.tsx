import React, { useEffect } from 'react';

import { Screen, InitialLoader } from '../common/types';
import { useAPI } from '../common/hooks';

import Page from '../components/Page';
import AuthContainer from './components/AuthContainer';

interface Props {
  token: string;
  next: string;
}

const MagicLinkPage = (props: Props) => {
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
  }, []);

  return (
    <Page title="Магическая ссылка" noMenu noFooter>
      <AuthContainer>Проверяем доступ...</AuthContainer>
    </Page>
  );
};

const getInitialData: InitialLoader<Props> = async ({ api }, params, query) => {
  return {
    token: query.token,
    next: query.next || '/my',
  };
};

const screen: Screen<Props> = {
  component: MagicLinkPage,
  getInitialData,
};

export default screen;
