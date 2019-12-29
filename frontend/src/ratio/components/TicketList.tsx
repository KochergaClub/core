import { useCallback } from 'react';

import { Row, Column } from '@kocherga/frontkit';
import { Badge, AsyncButton } from '~/components';

import Card, { CardList } from '~/components/Card';

import { usePermissions } from '~/common/hooks';

import { TicketStatus, TicketFiscalizationStatus } from '~/apollo/gen-types';

import {
  useRatioTicketFiscalizeMutation,
  TicketFragment,
} from '../queries.generated';

const CanceledBadge = () => <Badge>ОТКАЗ</Badge>;

const FiscalizeButton = ({ ticket }: { ticket: TicketFragment }) => {
  const [isKkmUser] = usePermissions(['cashier.kkm_user']);
  const [fiscalizeMutation] = useRatioTicketFiscalizeMutation({
    refetchQueries: ['RatioTrainingBySlug'],
    awaitRefetchQueries: true,
  });

  const click = useCallback(async () => {
    await fiscalizeMutation({
      variables: {
        ticket_id: ticket.id,
      },
    });
  }, [ticket.id, fiscalizeMutation]);

  if (!isKkmUser) {
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
        {ticket.status === TicketStatus.Canceled && <CanceledBadge />}
        {ticket.fiscalization_status === TicketFiscalizationStatus.Todo ? (
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
