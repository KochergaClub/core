import React, { useState, useCallback, useEffect } from 'react';

import styled from 'styled-components';

import { NextPage } from '~/common/types';
import Page from '~/components/Page';
import { redirect } from '~/components/RedirectPage';
import { selectUser } from '~/core/selectors';
import { useCommonHotkeys, useAPI } from '~/common/hooks';

import { Button, Input, Column } from '@kocherga/frontkit';
import AuthContainer from '~/auth/components/AuthContainer';

const SmallNote = styled.small`
  font-size: 0.6rem;
  line-height: 1.3;
  margin-bottom: 8px;
`;

interface Props {
  next: string;
}

const LoginPage: NextPage<Props> = props => {
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

LoginPage.getInitialProps = async ({ store: { getState }, query, res }) => {
  const user = selectUser(getState());
  if (user.is_authenticated) {
    return redirect('/', res) as any;
  }

  return {
    next: (query.next as string) || '/my/',
  };
};

export default LoginPage;