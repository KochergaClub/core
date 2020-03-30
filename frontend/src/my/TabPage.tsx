import styled from 'styled-components';

import { A, Column } from '@kocherga/frontkit';

import { withApollo } from '~/apollo/client';
import { NextApolloPage } from '~/apollo/types';
import { requireAuth } from '~/auth/utils';

import { ApolloQueryResults, Page } from '~/components';

import VisitsTab from './tabs/VisitsTab';
import TicketsTab from './tabs/TicketsTab';
import SettingsTab from './tabs/SettingsTab';
import LogoutButton from './components/LogoutButton';

import { useMyPageQuery, MyPageFragment } from './queries.generated';

const AdminSection = () => (
  <div style={{ marginBottom: 10 }}>
    <A href="/team/">Перейти в интранет</A>
  </div>
);

const SectionWrapper = styled.div`
  max-width: 600px;
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
      <Page title="Личный кабинет" menu="my">
        <Page.Title>Личный кабинет</Page.Title>
        <Page.Main>
          <ApolloQueryResults {...queryResults}>
            {({ data: { my } }) => (
              <Column centered>
                <div>
                  <code>{my.user.email}</code> <LogoutButton />
                </div>
                {my.user.is_staff && <AdminSection />}
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
