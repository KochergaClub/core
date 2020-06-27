import styled from 'styled-components';

import { A, Column } from '@kocherga/frontkit';

import { withApollo, NextApolloPage } from '~/apollo';
import { requireAuth } from '~/auth/utils';

import { ApolloQueryResults, Page } from '~/components';

import VisitsTab from './tabs/VisitsTab';
import TicketsTab from './tabs/TicketsTab';
import SettingsTab from './tabs/SettingsTab';
import LogoutButton from './components/LogoutButton';

import { useMyPageQuery, MyPageFragment } from './queries.generated';

const SectionWrapper = styled.div`
  margin-top: 20px;
`;

type TabCode = 'visits' | 'tickets' | 'settings';

export const buildTabPage = (tab: TabCode) => {
  const TabPage: NextApolloPage = () => {
    const queryResults = useMyPageQuery();

    const getSection = (my: MyPageFragment) => {
      switch (tab) {
        case 'visits':
          return <VisitsTab my={my} />;
        case 'tickets':
          return <TicketsTab my={my} />;
        case 'settings':
          return <SettingsTab my={my} />;
        default:
          throw new Error('Unknown tab');
      }
    };

    return (
      <Page title="Личный кабинет">
        <Page.Title>Личный кабинет</Page.Title>
        <Page.Main>
          <ApolloQueryResults {...queryResults}>
            {({ data: { my } }) => (
              <Column centered stretch>
                <SectionWrapper>{getSection(my)}</SectionWrapper>
              </Column>
            )}
          </ApolloQueryResults>
        </Page.Main>
      </Page>
    );
  };

  TabPage.getInitialProps = async ({ apolloClient }) => {
    await requireAuth(apolloClient, { is_authenticated: true });

    return {};
  };

  return withApollo(TabPage);
};
