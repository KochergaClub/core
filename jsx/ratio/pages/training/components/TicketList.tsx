import React, { useState, useCallback, useContext } from 'react';
import styled from 'styled-components';

import { Button, Row, colors } from '@kocherga/frontkit';
import { KKMServer, SignMethodCalculation } from '~/kkm/kkmServer';
import { useAPI } from '~/common/hooks';

import { Ticket } from '../../../types';
import { setTicketFiscalizationStatus } from '../../../api';
import { KkmContext, TrainingContext } from '../store';

export const Badge = styled.div`
  background-color: ${colors.accent[500]};
  border-radius: 10px;
  font-size: 12px;
  min-width: 20px;
  padding: 2px 6px;
  width: auto;
`;

const CanceledBadge = () => <Badge>ОТКАЗ</Badge>;

const FiscalizeButton = ({ ticket }: { ticket: Ticket }) => {
  const context = useContext(TrainingContext);
  const [loading, setLoading] = useState(false);

  const kkmPassword = useContext(KkmContext).password;

  const api = useAPI();

  const server = new KKMServer();

  const click = useCallback(async () => {
    await setTicketFiscalizationStatus(api, ticket.id, 'in_progress');

    const request = {
      title: `Участие в мероприятии: ${context.store.training.name}`,
      signMethodCalculation: SignMethodCalculation.PrePayment100,
      email: ticket.email,
      sum: ticket.payment_amount,
    };

    setLoading(true);

    server.call(
      server.getCheckRequest(request),
      async () => {
        await setTicketFiscalizationStatus(api, ticket.id, 'fiscalized');
        context.dispatch({
          type: 'TICKET_FISCALIZED',
          payload: {
            ticket_id: ticket.id,
          },
        });
        setLoading(false);
      },
      (error: object) => {
        window.alert('Fiscalization failed: ' + JSON.stringify(error));
      }
    );
  }, [
    server,
    context.store.training.long_name,
    ticket.email,
    ticket.payment_amount,
    ticket.id,
    kkmPassword,
  ]);

  if (!kkmPassword) {
    // no password -> no button
    return null;
  }

  server.setPassword(kkmPassword);

  return (
    <Button small loading={loading} disabled={loading} onClick={click}>
      Напечатать чек
    </Button>
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
