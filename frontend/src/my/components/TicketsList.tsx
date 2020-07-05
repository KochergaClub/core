import { useCallback, useMemo } from 'react';
import styled from 'styled-components';
import Link from 'next/link';

import { formatDistanceToNow, differenceInHours, parseISO } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';
import { ru } from 'date-fns/locale';
import { FiVideo } from 'react-icons/fi';

import {
  A,
  Label,
  Row,
  Button,
  Column,
  fonts,
  colors,
} from '@kocherga/frontkit';

import { DropdownMenu } from '~/components';
import Card, { CardList } from '~/components/Card';
import { Action } from '~/components/DropdownMenu';
import { timezone, formatDate } from '~/common/utils';

import {
  MyTicketsPageFragment,
  MyTicketFragment,
  useMyTicketDeleteMutation,
} from '../queries.generated';

const EventLink = styled(A)`
  color: black;
  font-size: ${fonts.sizes.L};
  line-height: 1.2;
`;

const DistanceLabel = styled.div`
  color: ${colors.grey[700]};
  font-size: ${fonts.sizes.S};
`;

const DropdownContainer = styled.div`
  float: right;
  margin-left: 10px;
`;

const TicketCard = ({
  ticket,
  later,
}: {
  ticket: MyTicketFragment;
  later?: boolean;
}) => {
  const [deleteMutation] = useMyTicketDeleteMutation({
    refetchQueries: ['MyTicketsPage'],
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
      <DropdownContainer>
        <DropdownMenu>
          <Action act={cancel}>Отменить регистрацию</Action>
        </DropdownMenu>
      </DropdownContainer>
      <Column stretch gutter={16}>
        <Column stretch gutter={16}>
          <Row spaced gutter={8}>
            <Link
              href="/events/[id]"
              as={`/events/${ticket.event.event_id}`}
              passHref
            >
              <EventLink>{ticket.event.title}</EventLink>
            </Link>
          </Row>
          <Column centered gutter={0}>
            <Label>{formatDate(zonedStart, 'cccc, d MMMM, HH:mm')} MSK</Label>
            <DistanceLabel>
              (
              {formatDistanceToNow(parseISO(ticket.event.start), {
                locale: ru,
                addSuffix: true,
              })}
              )
            </DistanceLabel>
          </Column>
        </Column>
        {!later && ticket.zoom_link && (
          <Row centered>
            <Button onClick={joinZoom} kind="primary">
              <Row vCentered gutter={8}>
                <FiVideo /> <span>Зайти</span>
              </Row>
            </Button>
          </Row>
        )}
      </Column>
    </Card>
  );
};

interface Props {
  my: MyTicketsPageFragment;
}

type TicketType = MyTicketsPageFragment['tickets']['nodes'][0];

const TicketsSublist: React.FC<{
  tickets: TicketType[];
  title: string;
  later?: boolean;
}> = ({ tickets, title, later }) => {
  if (!tickets.length) {
    return null;
  }

  return (
    <section>
      <Row centered>
        <h3>{title}:</h3>
      </Row>
      <CardList>
        {tickets.map(ticket => (
          <TicketCard
            key={ticket.event.event_id}
            ticket={ticket}
            later={later}
          />
        ))}
      </CardList>
    </section>
  );
};

const TicketsList: React.FC<Props> = ({ my }) => {
  const tickets = my.tickets.nodes;

  const LATER_THRESHOLD = 12;

  const condition = (ticket: TicketType) =>
    differenceInHours(parseISO(ticket.event.start), new Date()) <
    LATER_THRESHOLD;

  const soonTickets = useMemo(() => tickets.filter(condition), [tickets]);

  const laterTickets = useMemo(
    () => tickets.filter(ticket => !condition(ticket)),
    [tickets]
  );

  if (!tickets.length) {
    return (
      <Row centered>
        <em>Вы не зарегистрированы ни на одно событие.</em>
      </Row>
    );
  }

  return (
    <div>
      <TicketsSublist title="Скоро" tickets={soonTickets} />
      <TicketsSublist title="Позже" tickets={laterTickets} later={true} />
    </div>
  );
};

export default TicketsList;
