import { useCallback } from 'react';

import { utcToZonedTime } from 'date-fns-tz';
import { FaVideo } from 'react-icons/fa';

import { A, Label } from '@kocherga/frontkit';

import { AsyncButtonWithConfirm } from '~/components';
import Card, { CardList } from '~/components/Card';
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
    <Card>
      <A href={`/events/${ticket.event.event_id}`}>{ticket.event.title}</A>
      <Label>{formatDate(zonedStart, 'd MMMM, HH:mm')}</Label>
      {ticket.zoom_link && (
        <div>
          <A href={ticket.zoom_link}>
            <FaVideo /> Присоединиться через Zoom
          </A>
        </div>
      )}
      <AsyncButtonWithConfirm
        small
        act={cancel}
        confirmText="Точно отменить?"
        cancelText="Нет"
      >
        Отменить
      </AsyncButtonWithConfirm>
    </Card>
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
    <div>
      <h3>Вы собираетесь на эти события:</h3>
      <CardList>
        {tickets.map(ticket => (
          <TicketCard key={ticket.event.event_id} ticket={ticket} />
        ))}
      </CardList>
    </div>
  );
};

export default TicketsList;
