import React, { useCallback, useEffect, useRef, useState } from 'react';

import { useMutation } from '@apollo/client';

import { useCommonHotkeys } from '~/common/hooks';
import { FieldContainer } from '~/components/forms';
import { Button, Input, useNotification } from '~/frontkit';

import { LoginDocument, SendMagicLinkDocument } from '../queries.generated';
import { AuthContainer } from './AuthContainer';

interface Props {
  onLogin: () => void;
  onMagicLinkSent: () => void;
  next: string;
}

const AuthForm: React.FC<Props> = (props) => {
  const notify = useNotification();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // button shouldn't be enabled until we load JS on client
  const [initialLoading, setInitialLoading] = useState(true);

  const [leaving, setLeaving] = useState(false);

  const [loginMutation, { loading: submittingWithPassword }] = useMutation(
    LoginDocument,
    {
      variables: { email, password },
      onCompleted: (data) => {
        if (data.result.error) {
          notify({
            type: 'Error',
            text: data.result.error,
          });
          return;
        }

        if (!data.result.user?.is_authenticated) {
          notify({
            type: 'Error',
            text: 'Что-то пошло не так',
          });
          return;
        }

        setLeaving(true);
        props.onLogin();
      },
      onError: () => notify({ type: 'Error', text: 'Что-то пошло не так' }),
    }
  );

  // passwordless login - send magic link and ask to click it
  const [
    sendMagicLinkMutation,
    { loading: submittingWithoutPassword },
  ] = useMutation(SendMagicLinkDocument, {
    variables: { email, next: props.next },
    onCompleted: (data) => {
      if (!data.result.ok) {
        notify({
          type: 'Error',
          text: data.result.error || 'Что-то пошло не так',
        });
        return;
      }

      setLeaving(true);
      props.onMagicLinkSent();
    },
    onError: () => notify({ type: 'Error', text: 'Что-то пошло не так' }),
  });

  // enable inputs and buttons after first load
  useEffect(() => {
    setInitialLoading(false);
  }, []);

  // autofocus on email input after initialLoading is switched to false
  const emailRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (!initialLoading) {
      emailRef.current?.focus();
    }
  }, [initialLoading]);

  const submit = useCallback(async () => {
    if (password) {
      await loginMutation();
    } else {
      await sendMagicLinkMutation();
    }
  }, [password, loginMutation, sendMagicLinkMutation]);

  const acting = submittingWithoutPassword || submittingWithPassword || leaving;

  const hotkeys = useCommonHotkeys({
    onEnter: submit,
  });
  return (
    <AuthContainer>
      <div className="flex flex-col items-stretch space-y-4" {...hotkeys}>
        <FieldContainer title="Email:">
          <Input
            type="email"
            name="email"
            scale="big"
            maxLength={255}
            required
            ref={emailRef}
            disabled={acting}
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value)}
          />
        </FieldContainer>
        <div>
          <FieldContainer title="Пароль:">
            <Input
              type="password"
              name="password"
              scale="big"
              maxLength={255}
              disabled={acting}
              value={password}
              onChange={(e) => setPassword(e.currentTarget.value)}
            />
          </FieldContainer>
          <div className="text-xs mt-0.5">
            (если вы оставите это поле пустым, ссылка для логина придёт на
            почту)
          </div>
        </div>
        <Button
          type="submit"
          kind="primary"
          disabled={acting}
          loading={acting}
          onClick={submit}
        >
          Войти
        </Button>
      </div>
    </AuthContainer>
  );
};

export default AuthForm;
