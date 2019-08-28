import React from 'react';
import { useSelector } from 'react-redux';

import { A, Column, Row } from '@kocherga/frontkit';

import Card, { CardList } from '~/components/Card';
import Badge from '~/components/Badge';

import { Permission } from '../types';
import UserInfo from './UserInfo';

import { selectGroups, selectPermissions } from '../selectors';

const GroupsList: React.FC = () => {
  const groups = useSelector(selectGroups);
  const permissions = useSelector(selectPermissions);

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
