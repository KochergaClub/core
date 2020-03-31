import { useCallback } from 'react';
import { FaHeart } from 'react-icons/fa';

import { A, Column } from '@kocherga/frontkit';

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
      <Column>
        <div>
          Вы зарегистрированы! <FaHeart style={{ color: 'red' }} />
        </div>
        {event.my_ticket.zoom_link ? (
          <div>
            Ссылка на Zoom-созвон будет доступна в{' '}
            <A href="/my">личном кабинете</A>.
          </div>
        ) : (
          <div>
            <A href="/my">Посмотреть в личном кабинете</A>
          </div>
        )}
        <AsyncButton act={unregister} small>
          Отменить регистрацию
        </AsyncButton>
      </Column>
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
