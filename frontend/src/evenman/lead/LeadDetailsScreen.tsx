import Link from 'next/link';
import React from 'react';

import { useQuery } from '@apollo/client';

import { ApolloQueryResults, PaddedBlock } from '~/components';
import { Card } from '~/components/cards';
import { A, Column } from '~/frontkit';

import { leadsRoute } from '../routes';
import { LeadCard } from './LeadCard';
import { EvenmanLeadDetailsDocument } from './queries.generated';

interface Props {
  id: string;
}

export const LeadDetailsScreen: React.FC<Props> = ({ id }) => {
  const queryResults = useQuery(EvenmanLeadDetailsDocument, {
    variables: {
      id,
    },
  });

  return (
    <PaddedBlock>
      <Column gutter={16} stretch>
        <Link href={leadsRoute()} passHref>
          <A>&larr; Все лиды</A>
        </Link>
        <ApolloQueryResults {...queryResults}>
          {({ data }) => (
            <Card>
              <LeadCard lead={data.communityLead} />
            </Card>
          )}
        </ApolloQueryResults>
      </Column>
    </PaddedBlock>
  );
};
