import { useCallback, useState } from 'react';
import { A, Button, Row, Column } from '~/frontkit';

import AuthForm from '~/auth/components/AuthForm';
import { checkYourEmailRoute } from '~/auth/routes';

import { CommonProps } from '../types';

import AnonRegistration from './AnonRegistration';

const BackLink: React.FC<{ reset: () => void }> = ({ reset }) => {
  const onClick = useCallback(
    (e: React.SyntheticEvent) => {
      e.preventDefault();
      reset();
    },
    [reset]
  );

  return (
    <A href="#" onClick={onClick}>
      <small>&larr; вернуться</small>
    </A>
  );
};

const AnonChoice: React.FC<CommonProps> = props => {
  const [mode, setMode] = useState<'sign-in' | 'create-account' | undefined>();

  const reset = useCallback(() => setMode(undefined), []);

  switch (mode) {
    case 'sign-in':
      return (
        <Column gutter={32} centered>
          <AuthForm
            next={window.location.pathname}
            // no action needed because <Registration /> uses useUser() hook and will automatically render AuthenticationRegistration instead
            onLogin={() => null}
            onMagicLinkSent={() => {
              window.location.href = checkYourEmailRoute().as;
            }}
          />
          <BackLink reset={reset} />
        </Column>
      );
    case 'create-account':
      return (
        <Column gutter={32} centered>
          <AnonRegistration {...props} />
          <BackLink reset={reset} />
        </Column>
      );
    case undefined:
      return (
        <Row stretch gutter={16}>
          <Button
            kind="primary"
            onClick={() => setMode('sign-in')}
            style={{ display: 'block', flex: 1 }}
          >
            Войти
          </Button>
          <Button
            kind="danger"
            onClick={() => setMode('create-account')}
            style={{ display: 'block', flex: 1 }}
          >
            У меня ещё нет аккаунта
          </Button>
        </Row>
      );
  }
};

export default AnonChoice;
