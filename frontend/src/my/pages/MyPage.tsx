import { useState } from 'react';
import styled from 'styled-components';

import { withApollo } from '~/apollo/client';
import { NextApolloPage } from '~/apollo/types';
import { requireAuth } from '~/auth/utils';

import { A, Column, RowNav } from '@kocherga/frontkit';

import { ApolloQueryResults, Page } from '~/components';

import VisitsTab from '../tabs/VisitsTab';
import TicketsTab from '../tabs/TicketsTab';
import SettingsTab from '../tabs/SettingsTab';
import LogoutButton from '../components/LogoutButton';

import { useMyPageQuery, MyPageFragment } from '../queries.generated';

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

interface Props {}

const MyPage: NextApolloPage<Props> = () => {
  const queryResults = useMyPageQuery();

  const [tab, setTab] = useState<TabCode>('visits');

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

  const tabsWithNames = [
    ['visits', 'Посещения'],
    ['settings', 'Настройки'],
  ] as [TabCode, string][];

  return (
    <Page title="Личный кабинет">
      <Page.Title>Личный кабинет</Page.Title>
      <Page.Main>
        <ApolloQueryResults {...queryResults}>
          {({ data: { my } }) => (
            <Column centered>
              <div>
                <code>{my.email}</code> <LogoutButton />
              </div>
              {my.is_staff && <AdminSection />}
              <RowNav>
                {tabsWithNames.map(([t, tName]) => (
                  <RowNav.Item
                    key={t}
                    selected={tab === t}
                    select={() => setTab(t)}
                  >
                    {tName}
                  </RowNav.Item>
                ))}
              </RowNav>
              <SectionWrapper>{getSection(my)}</SectionWrapper>
            </Column>
          )}
        </ApolloQueryResults>
      </Page.Main>
    </Page>
  );
};

MyPage.getInitialProps = async ({ apolloClient }) => {
  await requireAuth(apolloClient, { is_authenticated: true });

  return {};
};

export default withApollo(MyPage);
