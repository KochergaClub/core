import { useState, useCallback, useEffect } from 'react';

import styled from 'styled-components';

import { Button, Input, Column } from '@kocherga/frontkit';

import { withApollo } from '~/apollo/client';
import { NextApolloPage } from '~/apollo/types';

import { Page } from '~/components';
import { redirect } from '~/components/RedirectPage';
import { useCommonHotkeys } from '~/common/hooks';
import { APIError } from '~/common/api';

import AuthContainer from '../components/AuthContainer';

import {
  CurrentUserQuery,
  CurrentUserDocument,
  useLoginMutation,
  useSendMagicLinkMutation,
} from '../queries.generated';

const SmallNote = styled.small`
  font-size: 0.6rem;
  line-height: 1.3;
  margin-bottom: 8px;
`;

interface Props {
  next: string;
}

const LoginPage: NextApolloPage<Props> = props => {
  const [loginMutation] = useLoginMutation();
  const [sendMagicLinkMutation] = useSendMagicLinkMutation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // button shouldn't be enabled until we load JS on client
  const [initialLoading, setInitialLoading] = useState(true);

  const [acting, setActing] = useState(false);

  useEffect(() => {
    setInitialLoading(false);
  }, []);

  const cb = useCallback(async () => {
    setActing(true);

    if (password) {
      const { data } = await loginMutation({
        variables: { email, password },
      });

      if (!data) {
        setActing(false);
        throw new Error('Login failed');
      }

      if (data.result.error) {
        setActing(false);
        throw new Error(data.result.error);
      }

      if (!data?.result.user?.is_authenticated) {
        setActing(false);
        throw new Error('not authenticated');
      }

      window.location.href = props.next;
    } else {
      // passwordless login - send magic link and ask to click it
      const { data } = await sendMagicLinkMutation({
        variables: { email, next: props.next },
      });

      if (!data || !data.result.ok) {
        setActing(false);
        throw new Error('Failed for unknown reason');
      }

      window.location.href = '/login/check-your-email';
    }
  }, [loginMutation, sendMagicLinkMutation, email, password, props.next]);

  const hotkeys = useCommonHotkeys({
    onEnter: cb,
  });

  return (
    <Page title="Логин">
      <Page.Title>Войти или зарегистрироваться</Page.Title>
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

LoginPage.getInitialProps = async ({ apolloClient, query, res }) => {
  const result = await apolloClient.query<CurrentUserQuery>({
    query: CurrentUserDocument,
  });

  if (!result.data) {
    throw new APIError('Expected query data', 500);
  }

  const user = result.data.my.user;

  if (user.is_authenticated) {
    return redirect('/', res) as any;
  }

  return {
    next: (query.next as string) || '/my',
  };
};

export default withApollo(LoginPage);
