import { AnimatePresence, motion } from 'framer-motion';
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
      <AnimatePresence initial={false}>
        {ticketTypes.map((ticketType) => (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            key={ticketType.id}
            layout
          >
            <TicketTypeCard ticketType={ticketType} />
          </motion.div>
        ))}
      </AnimatePresence>
    </Row>
  );
};

export default TicketTypeList;
