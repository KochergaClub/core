import { formatDistanceToNow, parseISO } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';
import { ru } from 'date-fns/locale';
import Link from 'next/link';
import React, { useCallback } from 'react';
import { FaTicketAlt, FaTrash } from 'react-icons/fa';
import { FiVideo } from 'react-icons/fi';

import { formatDate, timezone } from '~/common/utils';
import { CopyToClipboardIcon, DropdownMenu } from '~/components';
import { Card } from '~/components/cards';
import { MutationAction } from '~/components/DropdownMenu';
import { publicEventRoute } from '~/events/routes';
import { Button, colors, Column, Label, Row } from '~/frontkit';

import { MyTicketDeleteDocument, MyTicketFragment } from '../queries.generated';

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
      {/* TODO - use space="large" for card instead? */}
      <div className="sm:p-4">
        <div className="float-right ml-2">
          <DropdownMenu>
            <MutationAction
              mutation={MyTicketDeleteDocument}
              variables={{ event_id: ticket.event.id }}
              title="Отменить регистрацию"
              icon={FaTrash}
            />
          </DropdownMenu>
        </div>
        <div className="flex items-center space-x-6">
          <FaTicketAlt size={64} color={colors.primary[300]} />
          <div className="space-y-4 flex-1">
            <Column stretch gutter={16}>
              <Link href={publicEventRoute(ticket.event.id)} passHref>
                <a className="text-black text-2xl no-underline hover:underline">
                  {ticket.event.title}
                </a>
              </Link>
              <div>
                <Label>
                  {formatDate(zonedStart, 'cccc, d MMMM, HH:mm')} MSK
                </Label>
                <div className="text-gray-600 text-sm">
                  (
                  {formatDistanceToNow(parseISO(ticket.event.start), {
                    locale: ru,
                    addSuffix: true,
                  })}
                  )
                </div>
              </div>
            </Column>
            {!later && ticket.zoom_link && (
              <Row vCentered gutter={8}>
                <Button onClick={joinZoom} kind="primary">
                  <Row vCentered gutter={8}>
                    <FiVideo /> <span>Зайти</span>
                  </Row>
                </Button>
                <CopyToClipboardIcon text={ticket.zoom_link} />
              </Row>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default TicketCard;
