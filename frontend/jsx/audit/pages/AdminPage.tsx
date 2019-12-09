import React from 'react';

import { NextPage } from '~/common/types';

import Page from '~/components/Page';

import { loadMembers } from '~/staff/actions';
import { loadGroups } from '~/audit/features/groups';
import { loadPermissions } from '~/audit/features/permissions';

import SinglePermissionsList from '~/audit/components/SinglePermissionsList';
import GroupsList from '~/audit/components/GroupsList';

const AdminPage: NextPage = () => {
  return (
    <Page title="Внутренняя админка" team>
      <Page.Title>Админка доступов</Page.Title>
      <Page.Main>
        <SinglePermissionsList />
        <h2>Группы</h2>
        <GroupsList />
      </Page.Main>
    </Page>
  );
};

AdminPage.getInitialProps = async ({ store: { dispatch } }) => {
  await dispatch(loadGroups());
  await dispatch(loadPermissions());
  await dispatch(loadMembers());

  return {};
};

export default AdminPage;
