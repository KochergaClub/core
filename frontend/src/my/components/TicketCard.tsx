import { useCallback } from 'react';
import Link from 'next/link';
import styled from 'styled-components';

import { formatDistanceToNow, parseISO } from 'date-fns';

import { utcToZonedTime } from 'date-fns-tz';
import { ru } from 'date-fns/locale';
import { FiVideo } from 'react-icons/fi';
import { FaTicketAlt } from 'react-icons/fa';

import {
  A,
  Label,
  Row,
  Button,
  Column,
  colors,
  fonts,
} from '@kocherga/frontkit';

import { DropdownMenu } from '~/components';
import Card from '~/components/Card';
import { Action } from '~/components/DropdownMenu';
import { timezone, formatDate } from '~/common/utils';

import {
  MyTicketFragment,
  MyTicketsPageDocument,
  MyTicketsPageFragment,
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

interface Props {
  ticket: MyTicketFragment;
  later?: boolean;
}

const TicketCard: React.FC<Props> = ({ ticket, later }) => {
  const [deleteMutation] = useMyTicketDeleteMutation();

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
      <Row gutter={24} vCentered stretch>
        <FaTicketAlt size={64} color={colors.primary[300]} />
        <Column stretch gutter={16} style={{ flex: 1 }}>
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
      </Row>
    </Card>
  );
};

export default TicketCard;
