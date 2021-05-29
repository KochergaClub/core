import { formatDistanceToNow, parseISO } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';
import { ru } from 'date-fns/locale';
import Link from 'next/link';
import React, { useCallback } from 'react';
import { FaTicketAlt, FaTrash } from 'react-icons/fa';
import { FiVideo } from 'react-icons/fi';
import styled from 'styled-components';

import { formatDate, timezone } from '~/common/utils';
import { CopyToClipboardIcon, DropdownMenu } from '~/components';
import { Card } from '~/components/cards';
import { MutationAction } from '~/components/DropdownMenu';
import { publicEventRoute } from '~/events/routes';
import { A, Button, colors, Column, fonts, Label, Row } from '~/frontkit';

import { MyTicketDeleteDocument, MyTicketFragment } from '../queries.generated';

const EventLink = styled(A)`
  color: black;
  font-size: ${fonts.sizes.XL2};
  line-height: 1.2;
`;

const DistanceLabel = styled.div`
  color: ${colors.grey[700]};
  font-size: ${fonts.sizes.SM};
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
          <MutationAction
            mutation={MyTicketDeleteDocument}
            variables={{ event_id: ticket.event.id }}
            title="Отменить регистрацию"
            icon={FaTrash}
          />
        </DropdownMenu>
      </DropdownContainer>
      <Row gutter={24} vCentered stretch>
        <FaTicketAlt size={64} color={colors.primary[300]} />
        <Column stretch gutter={16} style={{ flex: 1 }}>
          <Column stretch gutter={16}>
            <Row spaced gutter={8}>
              <Link href={publicEventRoute(ticket.event.id)} passHref>
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
            <Row centered vCentered gutter={8}>
              <Button onClick={joinZoom} kind="primary">
                <Row vCentered gutter={8}>
                  <FiVideo /> <span>Зайти</span>
                </Row>
              </Button>
              <CopyToClipboardIcon text={ticket.zoom_link} />
            </Row>
          )}
        </Column>
      </Row>
    </Card>
  );
};

export default TicketCard;
