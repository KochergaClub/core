import React, { useState } from 'react';
import { connect, useDispatch } from 'react-redux';

import { utcToZonedTime } from 'date-fns-tz';

import { A, Button, Column } from '@kocherga/frontkit';

import { useAPI } from '~/common/hooks';
import { State } from '~/redux/store';
import { timezone, formatDate } from '~/common/utils';

import { MyTicket } from '../types';
import { loadTickets } from '../actions';
import { selectTickets } from '../selectors';

const TicketCard = ({ ticket }: { ticket: MyTicket }) => {
  const dispatch = useDispatch();
  const api = useAPI();
  const [loading, setLoading] = useState(false); // TODO - track `loading` state in redux?

  const cancel = React.useCallback(async () => {
    setLoading(true);

    // TODO - move to actions
    await api.call(
      `events/${ticket.event.event_id}/tickets/my`,
      'DELETE',
      {},
      false
    );

    await dispatch(loadTickets(api));
    setLoading(false);
  }, [api, dispatch, ticket.event.event_id]);

  const zonedStart = utcToZonedTime(ticket.event.start, timezone);

  return (
    <div>
      <A href={`/event/${ticket.event.event_id}/`}>{ticket.event.title}</A>
      <div>{formatDate(zonedStart, 'd MMMM, HH:mm')}</div>
      <Button small loading={loading} disabled={loading} onClick={cancel}>
        Отменить
      </Button>
    </div>
  );
};

interface Props {
  tickets: MyTicket[];
}

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

export default connect((state: State) => ({ tickets: selectTickets(state) }))(
  TicketsList
);
