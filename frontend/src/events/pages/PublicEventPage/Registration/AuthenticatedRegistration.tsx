import { useCallback } from 'react';
import styled from 'styled-components';
import { FaHeart, FaUser } from 'react-icons/fa';
import Link from 'next/link';

import { A, Row, Column, Label, colors } from '@kocherga/frontkit';

import { trackEvent } from '~/components/analytics';
import { AsyncButton } from '~/components';
import TicketCard from '~/my/components/TicketCard';

import { CommonProps } from '../types';

import { useMyEventsTicketRegisterMutation } from '../queries.generated';
import { useUser } from '~/common/hooks';

const Registered: React.FC<CommonProps> = ({ event }) => {
  if (!event.my_ticket) {
    throw new Error('Internal logic error');
  }
  return (
    <Column stretch gutter={16}>
      <TicketCard
        ticket={{
          id: event.my_ticket.id,
          status: event.my_ticket.status,
          zoom_link: event.my_ticket.zoom_link,
          event: event,
        }}
      />
      <Column centered>
        <Link href="/my">
          <A href="/my">Смотреть все регистрации в личном кабинете</A>
        </Link>
      </Column>
    </Column>
  );
};

const Unregistered: React.FC<CommonProps> = ({ event }) => {
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

  const register = useCallback(() => registerMutation(), [registerMutation]);

  return (
    <Column centered>
      <AsyncButton kind="primary" act={register}>
        Зарегистрироваться на мероприятие
      </AsyncButton>
    </Column>
  );
};

export default function Registration({ event }: CommonProps) {
  const user = useUser();

  const isRegistered = event?.my_ticket?.status === 'ok';

  return (
    <Column stretch gutter={16}>
      <Column centered gutter={0}>
        <Row vCentered>
          <FaUser color={colors.grey[500]} />
          <Link href="/my">
            <A href="/my">{user.email}</A>
          </Link>
        </Row>
        {isRegistered ? (
          <Row>
            <Label>Вы зарегистрированы</Label>
            <FaHeart style={{ color: 'red' }} />
          </Row>
        ) : null}
      </Column>
      {isRegistered ? (
        <Registered event={event} />
      ) : (
        <Unregistered event={event} />
      )}
    </Column>
  );
}
