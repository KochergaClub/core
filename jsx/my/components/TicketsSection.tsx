import React from 'react';

import { MyTicket } from '../types';

interface Props {
  tickets: MyTicket[];
}

export default function TicketsSection({ tickets }: Props) {
  if (!tickets.length) {
    return null;
  }
  return (
    <section>
      <h2>Регистрации</h2>
      {tickets.map(ticket => (
        <div key={ticket.event.event_id}>
          <a href={`/event/${ticket.event.event_id}/`}>{ticket.event.title}</a>
        </div>
      ))}
    </section>
  );
}
