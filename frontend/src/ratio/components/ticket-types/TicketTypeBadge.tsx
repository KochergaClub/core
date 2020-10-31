import React from 'react';

import { Badge } from '~/frontkit';
import { RatioTicketType_SummaryFragment } from '~/ratio/queries.generated';

interface Props {
  ticketType: RatioTicketType_SummaryFragment;
}

const TicketTypeBadge: React.FC<Props> = ({ ticketType }) => {
  return <Badge>{ticketType.price} руб.</Badge>;
};

export default TicketTypeBadge;
