import React from 'react';

import styled from 'styled-components';

import { Button } from '@kocherga/frontkit';

import { useAPI } from '~/common/hooks';

import { MyTicket } from '../types';

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

  const cancel = React.useCallback(
    async () => {
      await api.call(
        `events/${ticket.event.event_id}/tickets/my`,
        'DELETE',
        {},
        false
      );
    },
    [ticket.event.event_id]
  );
  return (
    <div>
      <a href={`/event/${ticket.event.event_id}/`}>{ticket.event.title}</a>
      <Button onClick={cancel}>Отменить</Button>
    </div>
  );
};

const TicketsList = ({ tickets }: Props) => {
  if (!tickets.length) {
    return <div>Вы не зарегистрированы ни на одно событие.</div>;
  }

  return (
    <div>
      {tickets.map(ticket => (
        <div key={ticket.event.event_id}>
          <TicketCard ticket={ticket} />
        </div>
      ))}
    </div>
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
