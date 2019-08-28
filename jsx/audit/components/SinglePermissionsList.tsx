import React from 'react';

import { Column, Row, Label } from '@kocherga/frontkit';

import { Permission } from '../types';

import UserInfo from './UserInfo';

const SinglePermissionsList: React.FC<{ permissions: Permission[] }> = ({
  permissions,
}) => {
  const permissionsWithUsers = permissions.filter(p => p.user_set.length > 0);

  if (!permissionsWithUsers.length) {
    return null;
  }

  return (
    <section>
      <h2>ВНИМАНИЕ: есть пользователи с доступами вне групп!</h2>
      {permissionsWithUsers.map(permission => (
        <Column key={permission.id}>
          <strong>{permission.name}</strong>
          <Label>Пользователи с этим доступом:</Label>
          <Row>
            {permission.user_set.map(user => (
              <UserInfo key={user.id} user={user} />
            ))}
          </Row>
        </Column>
      ))}
    </section>
  );
};

export default SinglePermissionsList;
