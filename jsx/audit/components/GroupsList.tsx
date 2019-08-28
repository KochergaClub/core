import React from 'react';

import { A, Column, Row } from '@kocherga/frontkit';

import Card, { CardList } from '~/components/Card';
import Badge from '~/components/Badge';

import { Group, Permission } from '../types';
import UserInfo from './UserInfo';

interface Props {
  groups: Group[];
  permissions: Permission[];
}

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
            <Row vCentered stretch>
              <strong>{group.name}</strong>
              <small>
                <A href={`/wagtail/groups/${group.id}/`}>
                  редактировать в wagtail
                </A>
              </small>
            </Row>
            <Row>
              {group.permissions.map(id => (
                <Badge key={id}>{permissionsObj[id].name}</Badge>
              ))}
            </Row>
            {group.user_set.map(user => (
              <UserInfo key={user.id} user={user} />
            ))}
          </Column>
        </Card>
      ))}
    </CardList>
  );
};

export default GroupsList;
