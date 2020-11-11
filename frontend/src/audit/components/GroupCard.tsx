import React, { useCallback } from 'react';

import { useMutation } from '@apollo/client';

import { MutationButton } from '~/components';
import Card from '~/components/Card';
import DropdownMenu, { LinkAction, ModalAction } from '~/components/DropdownMenu';
import { AsyncButton, Badge, Column, Row } from '~/frontkit';

import {
    AuthGroupsDocument, AuthGroupsQuery, AuthRemoveUserFromGroupDocument, DeleteAuthGroupDocument,
    MaybeStaffUserFragment
} from '../queries.generated';
import AddMemberToGroupModal from './AddMemberToGroupModal';
import AddUserToGroupModal from './AddUserToGroupModal';
import UserInfo from './UserInfo';

interface Props {
  group: AuthGroupsQuery['groups'][0];
}

const GroupCard: React.FC<Props> = ({ group }) => {
  const [removeUserFromGroupMutation] = useMutation(
    AuthRemoveUserFromGroupDocument,
    {
      refetchQueries: [{ query: AuthGroupsDocument }],
      awaitRefetchQueries: true,
    }
  );

  const removeUserCb = useCallback(
    async (user: MaybeStaffUserFragment) => {
      await removeUserFromGroupMutation({
        variables: {
          group_id: group.id,
          user_id: user.id,
        },
      });
    },
    [group, removeUserFromGroupMutation]
  );

  return (
    <Card>
      <Column>
        <Row stretch>
          <strong>{group.name}</strong>
          <DropdownMenu placement="bottom-start">
            <LinkAction href={`/wagtail/groups/${group.id}/`}>
              Редактировать в Wagtail
            </LinkAction>
            <ModalAction title="Добавить сотрудника">
              {({ close }) => (
                <AddMemberToGroupModal close={close} group={group} />
              )}
            </ModalAction>
            <ModalAction title="Добавить пользователя">
              {({ close }) => (
                <AddUserToGroupModal close={close} group={group} />
              )}
            </ModalAction>
          </DropdownMenu>
          <MutationButton
            mutation={DeleteAuthGroupDocument}
            variables={{ id: group.id }}
            kind="danger"
            size="small"
            refetchQueries={['AuthGroups']}
            confirmText="Группа будет удалена, и все участники группы потеряют права доступа, привязанные к группе."
          >
            Удалить
          </MutationButton>
        </Row>
        <Row wrap={true}>
          {group.permissions.map((permission) => (
            <Badge key={permission.id} hint={permission.as_string}>
              {permission.name}
            </Badge>
          ))}
        </Row>
        {group.users.map((user) => (
          <Row key={user.id}>
            <UserInfo user={user} />
            <AsyncButton size="small" act={async () => removeUserCb(user)}>
              удалить
            </AsyncButton>
          </Row>
        ))}
      </Column>
    </Card>
  );
};

export default GroupCard;
