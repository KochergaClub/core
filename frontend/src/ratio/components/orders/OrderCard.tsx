import { parseISO } from 'date-fns';
import Link from 'next/link';
import React from 'react';

import HumanizedDateTime from '~/components/HumanizedDateTime';
import { A, colors, Label, Row } from '~/frontkit';
import { trainingAdminRoute } from '~/ratio/routes';

import TicketTypeBadge from '../ticket-types/TicketTypeBadge';
import { RatioOrderFragment } from './queries.generated';

interface Props {
  order: RatioOrderFragment;
}

const OrderCard: React.FC<Props> = ({ order }) => {
  return (
    <div>
      <Row>
        <small>
          <HumanizedDateTime date={parseISO(order.created)} />
        </small>
        <small style={{ color: colors.grey[500] }}>{order.id}</small>
      </Row>
      <Row>
        <TicketTypeBadge ticketType={order.ticket_type} />
        <div>
          <Link
            {...trainingAdminRoute(order.ticket_type.training.slug)}
            passHref
          >
            <A>{order.ticket_type.name}</A>
          </Link>
        </div>
      </Row>
      <div>
        <A href={'mailto:' + order.email}>{order.email}</A>
      </div>
      <Row vCentered>
        <Label>Имя:</Label>
        <div>{order.first_name}</div>
      </Row>
      <Row vCentered>
        <Label>Фамилия:</Label>
        <div>{order.last_name}</div>
      </Row>
      <Row vCentered>
        <Label>Город:</Label>
        <div>{order.city}</div>
      </Row>
    </div>
  );
};

export default OrderCard;
