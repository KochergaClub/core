import { useQuery } from '@apollo/client';

import { NextApolloPage, withApollo } from '~/apollo';
import { requireAuth } from '~/auth/utils';
import { ApolloQueryResults, PaddedBlock, Page } from '~/components';

import { MyVisitsPageDocument } from '../queries.generated';
import VisitsTab from '../tabs/VisitsTab';

const MyVisitsPage: NextApolloPage = () => {
  const queryResults = useQuery(MyVisitsPageDocument);
  const title = 'Посещения пространства | Личный кабинет';

  return (
    <Page title={title}>
      <Page.Title>{title}</Page.Title>
      <Page.Main>
        <ApolloQueryResults {...queryResults} size="block">
          {({ data: { my } }) => (
            <PaddedBlock>
              <VisitsTab my={my} />
            </PaddedBlock>
          )}
        </ApolloQueryResults>
      </Page.Main>
    </Page>
  );
};

MyVisitsPage.getInitialProps = async ({ apolloClient }) => {
  await requireAuth(apolloClient, { is_authenticated: true });

  return {};
};

export default withApollo(MyVisitsPage);
