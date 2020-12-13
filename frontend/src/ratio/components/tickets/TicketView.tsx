import Head from 'next/head';
import React from 'react';

import { useQuery } from '@apollo/client';

import { ApolloQueryResults, PaddedBlock, Page } from '~/components';

import { RatioTicketByIdDocument } from './queries.generated';
import TicketCard from './TicketCard';

interface Props {
  id: string;
}

const TicketView: React.FC<Props> = ({ id }) => {
  const queryResults = useQuery(RatioTicketByIdDocument, {
    variables: { id },
  });

  return (
    <ApolloQueryResults {...queryResults} size="block">
      {({ data: { ticket } }) => {
        const title = `Билет №${ticket.id} - ${ticket.email}`;
        return (
          <>
            <Head>
              <title key="title">{title}</title>
            </Head>
            <Page.Title>{title}</Page.Title>
            <Page.Main>
              <PaddedBlock>
                <TicketCard ticket={ticket} />
              </PaddedBlock>
            </Page.Main>
          </>
        );
      }}
    </ApolloQueryResults>
  );
};

export default TicketView;
