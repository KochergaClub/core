import { AnimatePresence, motion } from 'framer-motion';
import React, { useCallback, useState } from 'react';
import { MdRefresh } from 'react-icons/md';

import { useQuery } from '@apollo/client';

import { ApolloQueryResults, PaddedBlock } from '~/components';
import HeadlessConnection from '~/components/collections/HeadlessConnection';
import Pager from '~/components/collections/Pager';
import { AsyncButton, Column, RadioButtonGroup, Row } from '~/frontkit';

import { RatioTicketsDocument, RatioTicketsQueryVariables } from './queries.generated';
import TicketCard from './TicketCard';

type Filter = 'all' | 'unfiscalized' | 'missing-payments';

const filterToVariables: {
  [k in Filter]: RatioTicketsQueryVariables['filter'];
} = {
  all: {},
  unfiscalized: {
    with_unfiscalized_checks: true,
  },
  'missing-payments': {
    with_missing_payments: true,
  },
};

const TicketCollectionBlock: React.FC = () => {
  const [filter, setFilter] = useState<Filter>('all');
  const queryResults = useQuery(RatioTicketsDocument, {
    variables: {
      first: 20,
      filter: filterToVariables[filter],
    },
  });

  const asyncSetFilter = useCallback(async (f: Filter) => {
    setFilter(f);
  }, []);

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
        <RadioButtonGroup selected={filter} select={asyncSetFilter}>
          <RadioButtonGroup.Button name="all">Все</RadioButtonGroup.Button>
          <RadioButtonGroup.Button name="unfiscalized">
            С непробитыми чеками
          </RadioButtonGroup.Button>
          <RadioButtonGroup.Button name="missing-payments">
            С недостающими платежами
          </RadioButtonGroup.Button>
        </RadioButtonGroup>
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
