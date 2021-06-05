import Link from 'next/link';
import React from 'react';

import { useQuery } from '@apollo/client';

import { ApolloQueryResults, PaddedBlock } from '~/components';
import { Card } from '~/components/cards';
import { A, Column } from '~/frontkit';

import { initiativesRoute } from '../routes';
import { InitiativeCard } from './InitiativeCard';
import { EvenmanInitiativeDetailsDocument } from './queries.generated';

interface Props {
  id: string;
}

export const InitiativeDetailsScreen: React.FC<Props> = ({ id }) => {
  const queryResults = useQuery(EvenmanInitiativeDetailsDocument, {
    variables: {
      id,
    },
  });

  return (
    <PaddedBlock>
      <Column gutter={16} stretch>
        <Link href={initiativesRoute()} passHref>
          <A>&larr; Все инициативы</A>
        </Link>
        <ApolloQueryResults {...queryResults}>
          {({ data }) => (
            <Card>
              <InitiativeCard initiative={data.result} />
            </Card>
          )}
        </ApolloQueryResults>
      </Column>
    </PaddedBlock>
  );
};
