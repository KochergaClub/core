import React, { useState, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { Redirect } from 'react-router';

import styled from 'styled-components';

import { Screen, InitialLoader } from '~/common/types';
import Page from '~/components/Page';
import { selectUser } from '~/core/selectors';

import { Button, Input, Column } from '@kocherga/frontkit';
import AuthContainer from './components/AuthContainer';

import { useCommonHotkeys, useAPI } from '../common/hooks';

const SmallNote = styled.small`
  font-size: 0.6rem;
  line-height: 1.3;
  margin-bottom: 8px;
`;

interface Props {
  next: string;
}

const LoginPage = (props: Props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // button shouldn't be enabled until we load JS on client
  const [initialLoading, setInitialLoading] = useState(true);

  const [acting, setActing] = useState(false);

  const api = useAPI();

  useEffect(() => {
    setInitialLoading(false);
  }, []);

  const cb = useCallback(async () => {
    setActing(true);

    if (password) {
      try {
        await api.call('auth/login', 'POST', {
          credentials: {
            email,
            password,
          },
          result: 'cookie',
        });
      } catch (e) {
        setActing(false);
        return;
      }

      window.location.href = props.next;
    } else {
      // passwordless login - send magic link and ask to click it
      try {
        await api.call('auth/send-magic-link', 'POST', {
          email,
          next: props.next,
        });
      } catch (e) {
        setActing(false);
        return;
      }

      window.location.href = '/login/check-your-email';
    }
  }, [api, email, password, props.next]);

  const hotkeys = useCommonHotkeys({
    onEnter: cb,
  });

  // TODO - move this to wrapper for LoginPage to avoid executing all the hooks above?
  const user = useSelector(selectUser);
  if (user.is_authenticated) {
    return <Redirect to="/" />;
  }

  return (
    <Page title="Логин">
      <AuthContainer {...hotkeys}>
        <Column stretch gutter={16}>
          <Column stretch gutter={0}>
            <label htmlFor="id_email">Email:</label>
            <Input
              type="email"
              name="email"
              maxLength={255}
              required
              id="id_email"
              disabled={acting || initialLoading}
              value={email}
              onChange={e => setEmail(e.currentTarget.value)}
            />
          </Column>
          <Column stretch gutter={0}>
            <label htmlFor="id_password">Пароль:</label>
            <SmallNote>
              (если вы оставите это поле пустым, ссылка для логина придёт на
              почту)
            </SmallNote>
            <Input
              type="password"
              name="password"
              maxLength={255}
              id="id_password"
              disabled={acting || initialLoading}
              value={password}
              onChange={e => setPassword(e.currentTarget.value)}
            />
          </Column>
          <Button
            type="submit"
            disabled={acting || initialLoading}
            loading={acting}
            onClick={cb}
          >
            Войти
          </Button>
        </Column>
      </AuthContainer>
    </Page>
  );
};

const getInitialData: InitialLoader<Props> = async ({}, { query }) => {
  return {
    next: query.next || '/my/',
  };
};

const screen: Screen<Props> = {
  component: LoginPage,
  getInitialData,
};

export default screen;
