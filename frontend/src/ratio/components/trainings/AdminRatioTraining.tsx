import Head from 'next/head';
import React from 'react';

import { useQuery } from '@apollo/client';

import { ApolloQueryResults, Page } from '~/components';

import TrainingTicketTypesBlock from '../ticket-types/TicketTypesBlock';
import { TrainingTicketsBlock } from '../TrainingTicketsBlock';
import { RatioTrainingBySlugDocument } from './queries.generated';
import { TrainingActionsBlock } from './TrainingActionsBlock';
import { TrainingInfoBlock } from './TrainingInfoBlock';
import { TrainingPromocodesBlock } from './TrainingPromocodesBlock';

interface Props {
  slug: string;
}

const AdminRatioTraining: React.FC<Props> = ({ slug }) => {
  const queryResults = useQuery(RatioTrainingBySlugDocument, {
    variables: { slug },
  });

  return (
    <ApolloQueryResults {...queryResults} size="block">
      {({ data: { training } }) => (
        <>
          <Head>
            <title key="title">{training.name}</title>
          </Head>
          <Page.Title>{training.name}</Page.Title>
          <Page.Main>
            <TrainingInfoBlock training={training} />
            <TrainingPromocodesBlock training={training} />
            <TrainingTicketTypesBlock training={training} />
            <TrainingTicketsBlock training={training} />
            <TrainingActionsBlock training={training} />
          </Page.Main>
        </>
      )}
    </ApolloQueryResults>
  );
};

export default AdminRatioTraining;
