import React from 'react';

import { Badge } from '~/frontkit';
import { RatioTicketTypeFragment } from '~/ratio/queries.generated';

interface Props {
  ticketType: RatioTicketTypeFragment;
}

const TicketTypeBadge: React.FC<Props> = ({ ticketType }) => {
  return <Badge>{ticketType.price} руб.</Badge>;
};

export default TicketTypeBadge;
