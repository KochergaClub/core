import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Row } from '@kocherga/frontkit';
import Badge from '~/components/Badge';
import AsyncButton from '~/components/AsyncButton';

import { selectKkmPassword } from '~/kkm/selectors';

import { Ticket } from '../types';

import { fiscalizeTicket } from '../actions';

const CanceledBadge = () => <Badge>ОТКАЗ</Badge>;

const FiscalizeButton = ({ ticket }: { ticket: Ticket }) => {
  const dispatch = useDispatch();
  const kkmPassword = useSelector(selectKkmPassword);

  const click = useCallback(async () => {
    await dispatch(fiscalizeTicket(ticket.id));
  }, [ticket.id, fiscalizeTicket, dispatch]);

  if (!kkmPassword) {
    // no password -> no button
    return null;
  }

  return (
    <AsyncButton small act={click}>
      Напечатать чек
    </AsyncButton>
  );
};

const TicketItem = ({ ticket }: { ticket: Ticket }) => {
  return (
    <li>
      <Row>
        <span>
          {ticket.first_name} {ticket.last_name} ({ticket.email})
        </span>
        {ticket.status === 'canceled' && <CanceledBadge />}
        {ticket.fiscalization_status === 'todo' ? (
          <FiscalizeButton ticket={ticket} />
        ) : (
          <Badge>{ticket.fiscalization_status}</Badge>
        )}
      </Row>
    </li>
  );
};

const TicketList = ({ tickets }: { tickets: Ticket[] }) => {
  return (
    <ul>
      {tickets.map(ticket => (
        <TicketItem key={ticket.email} ticket={ticket} />
      ))}
    </ul>
  );
};

export default TicketList;
