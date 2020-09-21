import { useQuery } from '@apollo/client';

import { NextApolloPage, withApollo } from '~/apollo';
import { requireAuth } from '~/auth/utils';
import { ApolloQueryResults, PaddedBlock, Page } from '~/components';

import { MyTicketsPageDocument } from '../queries.generated';
import TicketsTab from '../tabs/TicketsTab';

const MyTicketsPage: NextApolloPage = () => {
  const queryResults = useQuery(MyTicketsPageDocument);
  const title = 'Личный кабинет';

  return (
    <Page title={title}>
      <Page.Title>{title}</Page.Title>
      <Page.Main>
        <ApolloQueryResults {...queryResults} size="block">
          {({ data: { my } }) => (
            <PaddedBlock>
              <TicketsTab my={my} />
            </PaddedBlock>
          )}
        </ApolloQueryResults>
      </Page.Main>
    </Page>
  );
};

MyTicketsPage.getInitialProps = async ({ apolloClient }) => {
  await requireAuth(apolloClient, { is_authenticated: true });

  return {};
};

export default withApollo(MyTicketsPage);
