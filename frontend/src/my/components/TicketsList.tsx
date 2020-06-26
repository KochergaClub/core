import { useCallback } from 'react';

import { utcToZonedTime } from 'date-fns-tz';
import { FaVideo } from 'react-icons/fa';

import { A, Label, Row, Button, Column, colors } from '@kocherga/frontkit';

import { DropdownMenu } from '~/components';
import Card, { CardList } from '~/components/Card';
import { timezone, formatDate } from '~/common/utils';

import {
  MyPageFragment,
  MyTicketFragment,
  useMyTicketDeleteMutation,
} from '../queries.generated';
import { Action } from '~/components/DropdownMenu';

const TicketCard = ({ ticket }: { ticket: MyTicketFragment }) => {
  const [deleteMutation] = useMyTicketDeleteMutation({
    refetchQueries: ['MyPage'],
    awaitRefetchQueries: true,
  });

  const cancel = useCallback(async () => {
    await deleteMutation({
      variables: {
        event_id: ticket.event.event_id,
      },
    });
  }, [deleteMutation, ticket.event.event_id]);

  const zonedStart = utcToZonedTime(ticket.event.start, timezone);

  const joinZoom = useCallback(() => {
    if (!ticket.zoom_link) {
      return;
    }
    window.open(ticket.zoom_link, '_blank');
  }, [ticket.zoom_link]);

  return (
    <Card>
      <Column stretch>
        <div>
          <Row spaced>
            <A href={`/events/${ticket.event.event_id}`}>
              {ticket.event.title}
            </A>
            <DropdownMenu placement="bottom-end">
              <Action act={cancel}>Отменить регистрацию</Action>
            </DropdownMenu>
          </Row>
          <Label>{formatDate(zonedStart, 'd MMMM, HH:mm')}</Label>
        </div>
        {ticket.zoom_link && (
          <div>
            <Button onClick={joinZoom}>
              <Row vCentered>
                <FaVideo color={colors.grey[500]} />{' '}
                <span>Присоединиться через Zoom</span>
              </Row>
            </Button>
          </div>
        )}
      </Column>
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
      <Row centered>
        <em>Вы не зарегистрированы ни на одно событие.</em>
      </Row>
    );
  }

  return (
    <div>
      <Row centered>
        <h3>Вы собираетесь на эти события:</h3>
      </Row>
      <CardList>
        {tickets.map(ticket => (
          <TicketCard key={ticket.event.event_id} ticket={ticket} />
        ))}
      </CardList>
    </div>
  );
};

export default TicketsList;
