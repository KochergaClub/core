import React from 'react';

import { Column, Row } from '~/frontkit';

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
          <Card>
            <header>
              <strong>{ticketType.price} руб.</strong>
            </header>
            <div>{ticketType.name}</div>{' '}
          </Card>
        </EditTicketTypeLink>
      ))}
    </Row>
  );
};

export default TicketTypeList;
