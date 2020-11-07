import { AnimatePresence, motion } from 'framer-motion';
import React, { useState } from 'react';
import { MdRefresh } from 'react-icons/md';

import { useQuery } from '@apollo/client';

import { ApolloQueryResults, PaddedBlock } from '~/components';
import HeadlessConnection from '~/components/collections/HeadlessConnection';
import Pager from '~/components/collections/Pager';
import { AsyncButton, Column, Row } from '~/frontkit';

import { RatioTicketsDocument } from './queries.generated';
import TicketCard from './TicketCard';
import TicketListFilter, { FilterName, filterNameToInput } from './TicketListFilter';

const TicketCollectionBlock: React.FC = () => {
  const [filter, setFilter] = useState<FilterName>('all');
  const queryResults = useQuery(RatioTicketsDocument, {
    variables: {
      first: 20,
      filter: filterNameToInput[filter],
    },
  });

  return (
    <PaddedBlock width="wide">
      <Column stretch gutter={16}>
        <h2>
          <Row gutter={8}>
            <div>Билеты</div>
            <AsyncButton act={queryResults.refetch}>
              <Row vCentered>
                <MdRefresh />
                <span>Обновить</span>
              </Row>
            </AsyncButton>
          </Row>
        </h2>
        <TicketListFilter filter={filter} setFilter={setFilter} />
        <ApolloQueryResults {...queryResults} size="block">
          {({ data: { tickets } }) => (
            <HeadlessConnection
              connection={tickets}
              fetchPage={queryResults.refetch}
            >
              {({ items, next, previous }) => (
                <div>
                  <Column gutter={16} stretch>
                    <AnimatePresence initial={false}>
                      {items.map((ticket) => (
                        // FIXME - use TicketList for consistency
                        <motion.div
                          initial={{ opacity: 0, scale: 0.5 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.5 }}
                          layout
                          key={ticket.id}
                        >
                          <TicketCard ticket={ticket} />
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </Column>
                  <Pager
                    next={next}
                    previous={previous}
                    pageInfo={tickets.pageInfo}
                  />
                </div>
              )}
            </HeadlessConnection>
          )}
        </ApolloQueryResults>
      </Column>
    </PaddedBlock>
  );
};

export default TicketCollectionBlock;
