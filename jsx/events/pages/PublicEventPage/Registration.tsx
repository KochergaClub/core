import React, { useCallback, useState } from 'react';

import { A, Button } from '@kocherga/frontkit';

import { useAPI, useUser } from '~/common/hooks';

import { PublicEvent, EventTicket } from '~/events/types';

import { trackEvent } from '~/components/analytics';

import AnonRegistration from './AnonRegistration';

interface Props {
  event: PublicEvent;
  ticket?: EventTicket;
}

export default function Registration(props: Props) {
  const { event, ticket } = props;

  const [acting, setActing] = useState(false);

  const api = useAPI();
  const user = useUser();

  const unregister = useCallback(async () => {
    trackEvent('event_unregister', {
      label: event.title,
    });

    setActing(true);
    await api.call(`events/${event.event_id}/my_ticket/unregister`, 'POST');
    window.location.reload();
  }, [api, event.event_id]);

  const register = useCallback(async () => {
    trackEvent('event_register', {
      label: event.title,
    });

    setActing(true);
    await api.call(`events/${event.event_id}/my_ticket/register`, 'POST');
    window.location.reload();
  }, [api, event.event_id]);

  if (!user.is_authenticated) {
    return <AnonRegistration {...props} />;
  }

  if (user.is_authenticated) {
    // TODO - registration for logged-in users is not ready yet
    return <AnonRegistration {...props} />;
  }

  if (ticket) {
    return (
      <div>
        <div>Вы зарегистрированы.</div>
        <div>
          <A href="/my/">Посмотреть в личном кабинете</A>
        </div>
        <Button loading={acting} disabled={acting} onClick={unregister}>
          Отменить регистрацию
        </Button>
      </div>
    );
  }

  return (
    <div>
      <Button
        kind="primary"
        loading={acting}
        disabled={acting}
        onClick={register}
      >
        Зарегистрироваться
      </Button>
    </div>
  );
}
