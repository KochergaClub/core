import React from 'react';

import { Column, Row, Label } from '@kocherga/frontkit';

import { NextPage } from '~/common/types';
import { selectAPI } from '~/core/selectors';

import Card, { CardList } from '~/components/Card';
import Page from '~/components/Page';
import Badge from '~/components/Badge';

interface User {
  id: number;
  email: string;
}

interface Permission {
  id: number;
  name: string;
  user_set: User[];
}

interface Group {
  id: number;
  name: string;
  permissions: number[];
  user_set: User[];
}

interface Props {
  groups: Group[];
  permissions: Permission[];
}

const SinglePermissionsList: React.FC<{ permissions: Permission[] }> = ({
  permissions,
}) => {
  const permissionsWithUsers = permissions.filter(p => p.user_set.length > 0);

  if (!permissionsWithUsers.length) {
    return null;
  }

  return (
    <section>
      <h2>ВНИМАНИЕ: есть пользователи с доступами вне групп</h2>
      {permissionsWithUsers.map(permission => (
        <Column>
          <strong>{permission.name}</strong>
          <Label>Пользователи с этим доступом:</Label>
          <Row>
            {permission.user_set.map(user => (
              <div>{user.email}</div>
            ))}
          </Row>
        </Column>
      ))}
    </section>
  );
};

const GroupsList: React.FC<Props> = ({ groups, permissions }) => {
  const permissionsObj: { [k: number]: Permission } = {};
  permissions.forEach(permission => {
    permissionsObj[permission.id] = permission;
  });
  return (
    <CardList>
      {groups.map(group => (
        <Card key={group.id}>
          <Column>
            <strong>{group.name}</strong>
            {group.user_set.map(user => (
              <div>{user.email}</div>
            ))}
            <Row>
              {group.permissions.map(id => (
                <Badge>{permissionsObj[id].name}</Badge>
              ))}
            </Row>
          </Column>
        </Card>
      ))}
    </CardList>
  );
};

const AdminPage: NextPage<Props> = ({ groups, permissions }) => {
  return (
    <Page title="Внутренняя админка">
      <Page.Title>Админа доступов</Page.Title>
      <Page.Main>
        <SinglePermissionsList permissions={permissions} />
        <h2>Группы</h2>
        <GroupsList permissions={permissions} groups={groups} />
      </Page.Main>
    </Page>
  );
};

AdminPage.getInitialProps = async ({ store: { getState } }) => {
  const api = selectAPI(getState());

  const groups = await api.call('auth/groups', 'GET');
  const permissions = await api.call('auth/permissions', 'GET');

  return {
    groups,
    permissions,
  };
};

export default AdminPage;
