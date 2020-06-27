import { NextApolloPage, withApollo } from '~/apollo';
import { Page, ApolloQueryResults, PaddedBlock } from '~/components';
import { useMyTicketsPageQuery } from '../queries.generated';
import TicketsTab from '../tabs/TicketsTab';
import { requireAuth } from '~/auth/utils';

// FIXME - inconsistent naming, MyEvents vs MyTickets
const MyEventsPage: NextApolloPage = () => {
  const queryResults = useMyTicketsPageQuery();
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

MyEventsPage.getInitialProps = async ({ apolloClient }) => {
  await requireAuth(apolloClient, { is_authenticated: true });

  return {};
};

export default withApollo(MyEventsPage);
