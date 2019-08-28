import React from 'react';

import { NextPage } from '~/common/types';
import { selectAPI } from '~/core/selectors';

import Page from '~/components/Page';

import { loadMembers } from '~/staff/actions';
import { Group, Permission } from '~/audit/types';

import SinglePermissionsList from '~/audit/components/SinglePermissionsList';
import GroupsList from '~/audit/components/GroupsList';

interface Props {
  groups: Group[];
  permissions: Permission[];
}

const AdminPage: NextPage<Props> = ({ groups, permissions }) => {
  return (
    <Page title="Внутренняя админка" team>
      <Page.Title>Админка доступов</Page.Title>
      <Page.Main>
        <SinglePermissionsList permissions={permissions} />
        <h2>Группы</h2>
        <GroupsList permissions={permissions} groups={groups} />
      </Page.Main>
    </Page>
  );
};

AdminPage.getInitialProps = async ({ store: { getState, dispatch } }) => {
  const api = selectAPI(getState());

  const groups = await api.call('auth/groups', 'GET');
  const permissions = await api.call('auth/permissions', 'GET');
  await dispatch(loadMembers());

  return {
    groups,
    permissions,
  };
};

export default AdminPage;
