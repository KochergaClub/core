import { useCallback, useMemo } from 'react';

import { utcToZonedTime } from 'date-fns-tz';
import { FiVideo } from 'react-icons/fi';
import { FaEllipsisH } from 'react-icons/fa';

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
import { timezone, formatDate } from '~/common/utils';

import {
  MyPageFragment,
  MyTicketFragment,
  useMyTicketDeleteMutation,
} from '../queries.generated';
import { Action } from '~/components/DropdownMenu';
import styled from 'styled-components';
import { formatDistanceToNow, differenceInHours } from 'date-fns';
import { ru } from 'date-fns/locale';

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

const DropdownButtonContainer = styled.div`
  border: 1px solid ${colors.grey[200]};
  border-radius: 4px;
  padding: 4px;

  &:hover {
    border-color: ${colors.grey[300]};
  }
`;

const DropdownButton: React.FC = () => {
  return (
    <DropdownButtonContainer>
      <FaEllipsisH color={colors.grey[600]} />
    </DropdownButtonContainer>
  );
};

const TicketCard = ({
  ticket,
  later,
}: {
  ticket: MyTicketFragment;
  later?: boolean;
}) => {
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
      <DropdownContainer>
        <DropdownMenu placement="bottom-end" render={DropdownButton}>
          <Action act={cancel}>Отменить регистрацию</Action>
        </DropdownMenu>
      </DropdownContainer>
      <Column stretch gutter={16}>
        <Column stretch gutter={16}>
          <Row spaced gutter={8}>
            <EventLink href={`/events/${ticket.event.event_id}`}>
              {ticket.event.title}
            </EventLink>
          </Row>
          <Column centered gutter={0}>
            <Label>{formatDate(zonedStart, 'cccc, d MMMM, HH:mm')} MSK</Label>
            <DistanceLabel>
              (
              {formatDistanceToNow(new Date(ticket.event.start), {
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
  my: MyPageFragment;
}

type TicketType = MyPageFragment['tickets']['nodes'][0];

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
    differenceInHours(new Date(ticket.event.start), new Date()) <
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
