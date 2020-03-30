import { useCallback } from 'react';

import { A } from '@kocherga/frontkit';

import { useUser } from '~/common/hooks';

import { trackEvent } from '~/components/analytics';
import { AsyncButton } from '~/components';

import { CommonProps } from './types';

import AnonRegistration from './AnonRegistration';

import {
  useMyEventsTicketRegisterMutation,
  useMyEventsTicketUnregisterMutation,
} from './queries.generated';

export default function Registration(props: CommonProps) {
  const { event } = props;

  const user = useUser();

  const [registerMutation] = useMyEventsTicketRegisterMutation({
    variables: {
      event_id: event.event_id,
    },
    refetchQueries: ['GetPublicEvent'],
    awaitRefetchQueries: true,
    onCompleted: () => {
      trackEvent('register', {
        category: 'events',
        label: event.title,
      });
    },
  });

  const [unregisterMutation] = useMyEventsTicketUnregisterMutation({
    variables: {
      event_id: event.event_id,
    },
    refetchQueries: ['GetPublicEvent'],
    awaitRefetchQueries: true,
    onCompleted: () => {
      trackEvent('register', {
        category: 'events',
        label: event.title,
      });
    },
  });

  const register = useCallback(() => registerMutation(), [registerMutation]);

  const unregister = useCallback(() => unregisterMutation(), [
    unregisterMutation,
  ]);

  if (!user.is_authenticated) {
    return <AnonRegistration {...props} />;
  }

  if (event.my_ticket && event.my_ticket.status === 'ok') {
    return (
      <div>
        <div>Вы зарегистрированы.</div>
        <div>
          <A href="/my">Посмотреть в личном кабинете</A>
        </div>
        <AsyncButton act={unregister} small>
          Отменить регистрацию
        </AsyncButton>
      </div>
    );
  }

  return (
    <div>
      <AsyncButton kind="primary" act={register}>
        Зарегистрироваться
      </AsyncButton>
    </div>
  );
}
