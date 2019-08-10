import React, { useContext } from 'react';
import { connect, useDispatch } from 'react-redux';

import styled from 'styled-components';

import { APIError } from '~/common/api';
import { A, Column, RowNav } from '@kocherga/frontkit';

import { Screen, InitialLoader } from '~/common/types';
import GlobalContext from '~/components/GlobalContext';
import { State } from '~/redux/store';

import VisitsTab from './tabs/VisitsTab';
import NonCustomerVisitsTab from './tabs/NonCustomerVisitsTab';
import TicketsTab from './tabs/TicketsTab';
import SettingsTab from './tabs/SettingsTab';
import LogoutButton from './components/LogoutButton';

import Page from '~/components/Page';

import { Customer } from './types';

import * as actions from './actions';
import * as selectors from './selectors';

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

interface StateProps {
  tab: actions.TabName;
  customer?: Customer;
}

const MyPage: React.FC<OwnProps & StateProps> = ({ tab, customer }) => {
  const { user } = useContext(GlobalContext);
  const dispatch = useDispatch();

  const getSection = () => {
    switch (tab) {
      case 'visits':
        if (customer) {
          return <VisitsTab />;
        } else {
          return <NonCustomerVisitsTab />;
        }
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

const mapStateToProps = (state: State): StateProps => ({
  tab: selectors.selectTab(state),
  customer: selectors.selectCustomer(state),
});

const ConnectedPage = connect(
  mapStateToProps,
  {
    openTab: actions.openTab,
  }
)(MyPage);

const getInitialData: InitialLoader<OwnProps> = async ({
  api,
  user,
  store: { dispatch },
}) => {
  if (!user.email) {
    throw new APIError('You need to be logged in to see /my', 403);
  }

  await dispatch(actions.loadCmData(api));
  await dispatch(actions.loadTickets(api));

  return {};
};

const screen: Screen<OwnProps> = {
  component: ConnectedPage,
  getInitialData,
};

export default screen;
