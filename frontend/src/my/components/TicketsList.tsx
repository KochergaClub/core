import React from 'react';
import { connect } from 'react-redux';

import { utcToZonedTime } from 'date-fns-tz';

import { A, Column } from '@kocherga/frontkit';

import AsyncButton from '~/components/AsyncButton';
import { State } from '~/redux/store';
import { timezone, formatDate } from '~/common/utils';
import { useDispatch } from '~/common/hooks';

import { MyTicket } from '../types';
import { deleteTicket } from '../actions';
import { selectTickets } from '../selectors';

const TicketCard = ({ ticket }: { ticket: MyTicket }) => {
  const dispatch = useDispatch();

  const cancel = React.useCallback(async () => {
    await dispatch(deleteTicket(ticket));
  }, [dispatch, ticket]);

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
  tickets: MyTicket[];
}

const TicketsList = ({ tickets }: Props) => {
  if (!tickets.length) {
    return (
      <div>
        <em>
          Вы не зарегистрированы ни на одно событие. (Функционал регистрации
          находится в разработке).
        </em>
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
