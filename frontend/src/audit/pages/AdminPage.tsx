import React from 'react';

import { NextApolloPage, withApollo, withStaff } from '~/apollo';
import GroupsList from '~/audit/components/GroupsList';
import SinglePermissionsList from '~/audit/components/SinglePermissionsList';
import { Page } from '~/components';
import { Row } from '~/frontkit';

import { CreateGroupButton } from '../components/CreateGroupButton';

const AdminPage: NextApolloPage = () => {
  return (
    <Page title="Внутренняя админка" menu="team">
      <Page.Title>Админка доступов</Page.Title>
      <Page.Main>
        <SinglePermissionsList />
        <Row vCentered gutter={16}>
          <h2>Группы</h2>
          <CreateGroupButton />
        </Row>
        <GroupsList />
      </Page.Main>
    </Page>
  );
};

export default withApollo(withStaff(AdminPage));
