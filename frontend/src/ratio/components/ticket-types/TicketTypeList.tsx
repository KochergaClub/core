import React from 'react';

import { Row } from '@kocherga/frontkit';

import Card from '~/components/Card';

import { RatioTicketTypeFragment } from '../../queries.generated';
import EditTicketTypeLink from './EditTicketTypeLink';

interface Props {
  ticketTypes: RatioTicketTypeFragment[];
}

const TicketTypeList: React.FC<Props> = ({ ticketTypes }) => {
  return (
    <Row>
      {ticketTypes.map((ticketType) => (
        <EditTicketTypeLink key={ticketType.id} ticketType={ticketType}>
          <Card>{ticketType.price} руб.</Card>
        </EditTicketTypeLink>
      ))}
    </Row>
  );
};

export default TicketTypeList;
