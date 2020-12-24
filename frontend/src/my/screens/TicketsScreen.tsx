import Link from 'next/link';
import React from 'react';

import { useQuery } from '@apollo/client';

import { ApolloQueryResults, HintCard, PaddedBlock, Page } from '~/components';
import { publicEventsRootRoute } from '~/events/routes';
import { A, Column, HR, Row } from '~/frontkit';

import TicketsList from '../components/TicketsList';
import { MyTicketsPageDocument } from '../queries.generated';

const OtherEvents = () => (
  <Row centered>
    <Link href={publicEventsRootRoute()} passHref>
      <A>Посмотреть календарь всех событий</A>
    </Link>
  </Row>
);

export const TicketsScreen: React.FC = () => {
  const queryResults = useQuery(MyTicketsPageDocument);

  return (
    <div>
      <Page.Title>События</Page.Title>
      <PaddedBlock>
        <ApolloQueryResults {...queryResults} size="block">
          {({ data: { my } }) => (
            <div>
              <TicketsList my={my} />
              <HR />
              <OtherEvents />
              <HR />
              <Column centered>
                <HintCard>
                  Кочерга развивается благодаря поддержке участниками
                  сообщества. Подпишитесь на наш{' '}
                  <A href="https://www.patreon.com/kocherga">Patreon</A>, чтобы
                  мы могли и дальше организовывать встречи.
                </HintCard>
              </Column>
            </div>
          )}
        </ApolloQueryResults>
      </PaddedBlock>
    </div>
  );
};
