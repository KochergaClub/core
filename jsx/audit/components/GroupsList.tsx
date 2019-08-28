import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { A, Column, Row } from '@kocherga/frontkit';

import Card, { CardList } from '~/components/Card';
import Badge from '~/components/Badge';
import AsyncButton from '~/components/AsyncButton';

import { Permission } from '../types';
import UserInfo from './UserInfo';

import { Group, User } from '../types';
import { selectGroups, selectPermissions } from '../selectors';
import { removeUserFromGroup } from '../actions';

const GroupsList: React.FC = () => {
  const groups = useSelector(selectGroups);
  const permissions = useSelector(selectPermissions);
  const dispatch = useDispatch();

  const permissionsObj: { [k: number]: Permission } = {};
  permissions.forEach(permission => {
    permissionsObj[permission.id] = permission;
  });

  const removeUserCb = useCallback(
    async (group: Group, user: User) => {
      await dispatch(removeUserFromGroup(group, user));
    },
    [dispatch]
  );

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
              <Row>
                <UserInfo key={user.id} user={user} />
                <AsyncButton small act={async () => removeUserCb(group, user)}>
                  удалить
                </AsyncButton>
              </Row>
            ))}
          </Column>
        </Card>
      ))}
    </CardList>
  );
};

export default GroupsList;
