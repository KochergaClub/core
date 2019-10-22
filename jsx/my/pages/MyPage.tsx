import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styled from 'styled-components';

import { A, Column, RowNav } from '@kocherga/frontkit';

import { NextPage } from '~/common/types';
import { APIError } from '~/common/api';
import { selectUser } from '~/core/selectors';
import { useUser } from '~/common/hooks';

import VisitsTab from '~/my/tabs/VisitsTab';
import TicketsTab from '~/my/tabs/TicketsTab';
import SettingsTab from '~/my/tabs/SettingsTab';
import LogoutButton from '~/my/components/LogoutButton';

import Page from '~/components/Page';

import * as actions from '~/my/actions';
import * as selectors from '~/my/selectors';

const AdminSection = () => (
  <div style={{ marginBottom: 10 }}>
    <A href="/team/">Перейти в интранет</A>
  </div>
);

const SectionWrapper = styled.div`
  max-width: 600px;
  margin-top: 20px;
`;

interface OwnProps {}

const MyPage: NextPage<OwnProps> = () => {
  const user = useUser();
  const dispatch = useDispatch();
  const tab = useSelector(selectors.selectTab);

  const getSection = () => {
    switch (tab) {
      case 'visits':
        return <VisitsTab />;
      case 'tickets':
        return <TicketsTab />;
      case 'settings':
        return <SettingsTab />;
      default:
        throw new Error('Unknown tab');
    }
  };

  return (
    <Page title="Личный кабинет">
      <Page.Title>Личный кабинет</Page.Title>
      <Page.Main>
        <Column centered>
          <div>
            <code>{user.email}</code> <LogoutButton />
          </div>
          {user.is_staff && <AdminSection />}
          <RowNav>
            {[
              ['tickets', 'События'],
              ['visits', 'Посещения'],
              ['settings', 'Настройки'],
            ].map(([t, tName]) => (
              <RowNav.Item
                key={t}
                selected={tab === t}
                select={() => dispatch(actions.openTab(t))}
              >
                {tName}
              </RowNav.Item>
            ))}
          </RowNav>
          <SectionWrapper>{getSection()}</SectionWrapper>
        </Column>
      </Page.Main>
    </Page>
  );
};

MyPage.getInitialProps = async ({ store: { dispatch, getState } }) => {
  const user = selectUser(getState());

  if (!user.email) {
    throw new APIError('You need to be logged in to see /my', 403);
  }

  await dispatch(actions.loadCmData());
  await dispatch(actions.loadTickets());

  return {};
};

export default MyPage;
