import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { A, Column, Row } from '@kocherga/frontkit';

import Card from '~/components/Card';
import Badge from '~/components/Badge';
import AsyncButton from '~/components/AsyncButton';
import ButtonWithModal from '~/components/ButtonWithModal';

import UserInfo from './UserInfo';
import AddMemberToGroupModal from './AddMemberToGroupModal';

import { Group, User, Permission } from '../types';

import { selectPermissions } from '../selectors';
import { removeUserFromGroup } from '../actions';

interface Props {
  group: Group;
}

const GroupCard: React.FC<Props> = ({ group }) => {
  const dispatch = useDispatch();
  const permissions = useSelector(selectPermissions);

  // FIXME - move to selector
  const permissionsObj: { [k: number]: Permission } = {};
  permissions.forEach(permission => {
    permissionsObj[permission.id] = permission;
  });

  const removeUserCb = useCallback(
    async (user: User) => {
      await dispatch(removeUserFromGroup(group, user));
    },
    [dispatch, group]
  );

  return (
    <Card>
      <Column>
        <Row vCentered stretch>
          <strong>{group.name}</strong>
          <small>
            <A href={`/wagtail/groups/${group.id}/`}>редактировать в wagtail</A>
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
            <AsyncButton small act={async () => removeUserCb(user)}>
              удалить
            </AsyncButton>
          </Row>
        ))}
        <ButtonWithModal title="Добавить сотрудника" small>
          {({ close }) => <AddMemberToGroupModal close={close} group={group} />}
        </ButtonWithModal>
      </Column>
    </Card>
  );
};

export default GroupCard;
