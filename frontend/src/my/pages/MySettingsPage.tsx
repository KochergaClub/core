import { useQuery } from '@apollo/client';

import { NextApolloPage, withApollo } from '~/apollo';
import { requireAuth } from '~/auth/utils';
import { ApolloQueryResults, PaddedBlock, Page } from '~/components';

import { MySettingsPageDocument } from '../queries.generated';
import SettingsTab from '../tabs/SettingsTab';

const MySettingsPage: NextApolloPage = () => {
  const queryResults = useQuery(MySettingsPageDocument);
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
