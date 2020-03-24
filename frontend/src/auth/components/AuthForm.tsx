import { useState, useCallback, useEffect } from 'react';

import styled from 'styled-components';

import { Button, Input, Column } from '@kocherga/frontkit';
import { useCommonHotkeys, useNotification } from '~/common/hooks';
import AuthContainer from './AuthContainer';

import {
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

const AuthForm: React.FC<Props> = props => {
  const notify = useNotification();
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
        notify({
          type: 'Error',
          text: 'Login failed',
        });
        return;
      }

      if (data.result.error) {
        setActing(false);
        notify({
          type: 'Error',
          text: data.result.error,
        });
        return;
      }

      if (!data?.result.user?.is_authenticated) {
        setActing(false);
        notify({
          type: 'Error',
          text: 'not authenticated',
        });
        return;
      }

      window.location.href = props.next;
    } else {
      // passwordless login - send magic link and ask to click it
      const { data } = await sendMagicLinkMutation({
        variables: { email, next: props.next },
      });

      if (!data || !data.result.ok) {
        setActing(false);
        notify({
          type: 'Error',
          text: 'Failed for some reason',
        });
        return;
      }

      window.location.href = '/login/check-your-email';
    }
  }, [
    loginMutation,
    sendMagicLinkMutation,
    notify,
    email,
    password,
    props.next,
  ]);

  const hotkeys = useCommonHotkeys({
    onEnter: cb,
  });
  return (
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
  );
};

export default AuthForm;
