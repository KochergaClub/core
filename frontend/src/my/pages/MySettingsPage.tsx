import { NextApolloPage, withApollo } from '~/apollo';
import { Page, ApolloQueryResults, PaddedBlock } from '~/components';
import { useMySettingsPageQuery } from '../queries.generated';
import SettingsTab from '../tabs/SettingsTab';
import { requireAuth } from '~/auth/utils';

const MySettingsPage: NextApolloPage = () => {
  const queryResults = useMySettingsPageQuery();
  const title = 'Настройки';

  return (
    <Page title={title}>
      <Page.Title>{title}</Page.Title>
      <Page.Main>
        <ApolloQueryResults {...queryResults} size="block">
          {({ data: { my } }) => (
            <PaddedBlock>
              <SettingsTab my={my} />
            </PaddedBlock>
          )}
        </ApolloQueryResults>
      </Page.Main>
    </Page>
  );
};

MySettingsPage.getInitialProps = async ({ apolloClient }) => {
  await requireAuth(apolloClient, { is_authenticated: true });

  return {};
};

export default withApollo(MySettingsPage);
