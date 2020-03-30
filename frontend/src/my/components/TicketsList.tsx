import { useCallback } from 'react';

import { utcToZonedTime } from 'date-fns-tz';

import { A, Column } from '@kocherga/frontkit';

import { AsyncButton } from '~/components';
import { timezone, formatDate } from '~/common/utils';

import {
  MyPageFragment,
  MyTicketFragment,
  useMyTicketDeleteMutation,
} from '../queries.generated';

const TicketCard = ({ ticket }: { ticket: MyTicketFragment }) => {
  const [deleteMutation] = useMyTicketDeleteMutation();

  const cancel = useCallback(async () => {
    await deleteMutation({
      variables: {
        event_id: ticket.event.event_id,
      },
    });
  }, [deleteMutation, ticket.event.event_id]);

  const zonedStart = utcToZonedTime(ticket.event.start, timezone);

  return (
    <div>
      <A href={`/event/${ticket.event.event_id}/`}>{ticket.event.title}</A>
      <div>{formatDate(zonedStart, 'd MMMM, HH:mm')}</div>
      <AsyncButton small act={cancel}>
        Отменить
      </AsyncButton>
    </div>
  );
};

interface Props {
  my: MyPageFragment;
}

const TicketsList: React.FC<Props> = ({ my }) => {
  const tickets = my.tickets.nodes;

  if (!tickets.length) {
    return (
      <div>
        <em>Вы не зарегистрированы ни на одно событие.</em>
      </div>
    );
  }

  return (
    <Column>
      <h3>Вы собираетесь на эти события:</h3>
      {tickets.map(ticket => (
        <TicketCard key={ticket.event.event_id} ticket={ticket} />
      ))}
    </Column>
  );
};

export default TicketsList;
