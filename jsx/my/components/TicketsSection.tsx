import React, { useContext, useState } from 'react';

import styled from 'styled-components';

import { utcToZonedTime } from 'date-fns-tz';

import { Button, Column } from '@kocherga/frontkit';

import { useAPI } from '~/common/hooks';
import { timezone, formatDate } from '~/common/utils';

import { MyTicket } from '../types';
import { MyDispatch } from '../store';
import { getTickets } from '../api';

interface Props {
  tickets: MyTicket[];
}

const HR = styled.hr`
  margin: 32px 0;
  height: 1px;
  border: 0;
  border-top: 1px solid #ddd;
`;

const TicketCard = ({ ticket }: { ticket: MyTicket }) => {
  const api = useAPI();
  const dispatch = useContext(MyDispatch);
  const [loading, setLoading] = useState(false);

  const cancel = React.useCallback(
    async () => {
      setLoading(true);
      await api.call(
        `events/${ticket.event.event_id}/tickets/my`,
        'DELETE',
        {},
        false
      );

      const tickets = await getTickets(api);
      dispatch({
        type: 'REPLACE_TICKETS',
        payload: {
          tickets,
        },
      });
      setLoading(false);
    },
    [ticket.event.event_id]
  );

  const zonedStart = utcToZonedTime(ticket.event.start, timezone);

  return (
    <div>
      <a href={`/event/${ticket.event.event_id}/`}>{ticket.event.title}</a>
      <div>{formatDate(zonedStart, 'd MMMM, HH:mm')}</div>
      <Button small loading={loading} disabled={loading} onClick={cancel}>
        Отменить
      </Button>
    </div>
  );
};

const TicketsList = ({ tickets }: Props) => {
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

const OtherEvents = () => (
  <div>
    <a href="/">Посмотреть ближайшие события</a>
  </div>
);

export default function TicketsSection({ tickets }: Props) {
  return (
    <section>
      <TicketsList tickets={tickets} />
      <HR />
      <OtherEvents />
    </section>
  );
}
