import { useCallback } from 'react';
import { useSelector } from 'react-redux';

import { Row, Column } from '@kocherga/frontkit';
import { Badge, AsyncButton } from '~/components';

import Card, { CardList } from '~/components/Card';

import { selectKkmPassword } from '~/kkm/selectors';
import { useDispatch } from '~/common/hooks';

import { TicketFragment } from '../queries.generated';

import { fiscalizeTicket } from '../features/trainingTickets';

const CanceledBadge = () => <Badge>ОТКАЗ</Badge>;

const FiscalizeButton = ({ ticket }: { ticket: TicketFragment }) => {
  const dispatch = useDispatch();
  const kkmPassword = useSelector(selectKkmPassword);

  const click = useCallback(async () => {
    await dispatch(fiscalizeTicket(parseInt(ticket.id)));
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

const TicketItem = ({ ticket }: { ticket: TicketFragment }) => {
  return (
    <Card>
      <Column>
        <Row gutter={10}>
          <strong>
            {ticket.first_name} {ticket.last_name}
          </strong>
          <div>{ticket.email}</div>
        </Row>
        <div>{ticket.payment_amount} руб.</div>
        {ticket.status === 'canceled' && <CanceledBadge />}
        {ticket.fiscalization_status === 'todo' ? (
          <FiscalizeButton ticket={ticket} />
        ) : (
          <Badge>{ticket.fiscalization_status}</Badge>
        )}
      </Column>
    </Card>
  );
};

const TicketList = ({ tickets }: { tickets: TicketFragment[] }) => {
  return (
    <CardList>
      {tickets.map(ticket => (
        <TicketItem key={ticket.email} ticket={ticket} />
      ))}
    </CardList>
  );
};

export default TicketList;
