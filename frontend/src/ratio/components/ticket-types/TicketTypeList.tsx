import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';

import { CardList } from '~/components/Card';

import { RatioTicketTypeFragment } from '../../queries.generated';
import TicketTypeCard from './TicketTypeCard';

interface Props {
  ticketTypes: RatioTicketTypeFragment[];
}

const TicketTypeList: React.FC<Props> = ({ ticketTypes }) => {
  return (
    <CardList>
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
    </CardList>
  );
};

export default TicketTypeList;
