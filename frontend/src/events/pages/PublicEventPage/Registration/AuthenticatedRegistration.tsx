import Link from 'next/link';
import { useCallback } from 'react';
import { FaHeart, FaUser } from 'react-icons/fa';

import { useMutation } from '@apollo/client';

import { useUser } from '~/common/hooks';
import { AsyncButton } from '~/components';
import { trackEvent } from '~/components/analytics';
import { A, colors, Column, Label, Row } from '~/frontkit';
import TicketCard from '~/my/components/TicketCard';

import { MyEventsTicketRegisterDocument } from '../queries.generated';
import { CommonProps } from '../types';

const Registered: React.FC<CommonProps> = ({ event }) => {
  if (!event.my_ticket) {
    throw new Error('Internal logic error');
  }
  return (
    <Column stretch gutter={16}>
      <TicketCard
        ticket={{
          __typename: event.my_ticket.__typename,
          id: event.my_ticket.id,
          status: event.my_ticket.status,
          zoom_link: event.my_ticket.zoom_link,
          event,
        }}
      />
      <Column centered>
        <Link href="/my" passHref>
          <A>Смотреть все регистрации в личном кабинете</A>
        </Link>
      </Column>
    </Column>
  );
};

const Unregistered: React.FC<CommonProps> = ({ event }) => {
  const [registerMutation] = useMutation(MyEventsTicketRegisterDocument, {
    variables: {
      event_id: event.id,
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
          <Link href="/my" passHref>
            <A>{user.email}</A>
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
