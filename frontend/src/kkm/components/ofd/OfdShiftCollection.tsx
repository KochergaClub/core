import React from 'react';

import { useQuery } from '@apollo/client';

import { ApolloQueryResults, PaddedBlock } from '~/components';
import { CardList } from '~/components/Card';
import HeadlessConnection from '~/components/collections/HeadlessConnection';
import Pager from '~/components/collections/Pager';

import OfdShiftCard from './OfdShiftCard';
import { OfdShiftsDocument } from './queries.generated';

const OfdFiscalDriveCollection: React.FC = () => {
  const queryResults = useQuery(OfdShiftsDocument, {
    variables: { first: 20 },
  });

  return (
    <PaddedBlock>
      <h2>Все смены</h2>
      <ApolloQueryResults {...queryResults}>
        {({ data: { ofdShifts } }) => (
          <HeadlessConnection
            connection={ofdShifts}
            fetchPage={queryResults.refetch}
          >
            {({ items, next, previous }) => (
              <div>
                <CardList>
                  {items.map((shift) => (
                    <OfdShiftCard key={shift.id} shift={shift} />
                  ))}
                </CardList>
                <Pager
                  next={next}
                  previous={previous}
                  pageInfo={ofdShifts.pageInfo}
                />
              </div>
            )}
          </HeadlessConnection>
        )}
      </ApolloQueryResults>
    </PaddedBlock>
  );
};

export default OfdFiscalDriveCollection;
