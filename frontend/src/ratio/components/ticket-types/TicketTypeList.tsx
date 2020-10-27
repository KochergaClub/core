import React from 'react';

import { Row } from '~/frontkit';

import { RatioTicketTypeFragment } from '../../queries.generated';
import TicketTypeCard from './TicketTypeCard';

interface Props {
  ticketTypes: RatioTicketTypeFragment[];
}

const TicketTypeList: React.FC<Props> = ({ ticketTypes }) => {
  return (
    <Row>
      {ticketTypes.map((ticketType) => (
        <TicketTypeCard key={ticketType.id} ticketType={ticketType} />
      ))}
    </Row>
  );
};

export default TicketTypeList;
