import { NextApolloPage, withApollo } from '~/apollo';
import { Page, ApolloQueryResults, PaddedBlock } from '~/components';
import { useMyVisitsPageQuery } from '../queries.generated';
import VisitsTab from '../tabs/VisitsTab';
import { requireAuth } from '~/auth/utils';

const MyVisitsPage: NextApolloPage = () => {
  const queryResults = useMyVisitsPageQuery();
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
