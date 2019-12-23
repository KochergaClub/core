import { useCallback } from 'react';

import { Column, Row } from '@kocherga/frontkit';

import DropdownMenu, {
  LinkAction,
  ModalAction,
} from '~/components/DropdownMenu';

import { Badge, AsyncButton } from '~/components';
import Card from '~/components/Card';

import UserInfo from './UserInfo';
import AddMemberToGroupModal from './AddMemberToGroupModal';

import {
  AuthGroupsQuery,
  AuthGroupsDocument,
  MaybeStaffUserFragment,
  useAuthRemoveUserFromGroupMutation,
} from '../queries.generated';

interface Props {
  group: AuthGroupsQuery['groups'][0];
}

const GroupCard: React.FC<Props> = ({ group }) => {
  const [removeUserFromGroupMutation] = useAuthRemoveUserFromGroupMutation({
    refetchQueries: [{ query: AuthGroupsDocument }],
    awaitRefetchQueries: true,
  });

  const removeUserCb = useCallback(
    async (user: MaybeStaffUserFragment) => {
      await removeUserFromGroupMutation({
        variables: {
          group_id: group.id,
          user_id: user.id,
        },
      });
    },
    [group]
  );

  return (
    <Card>
      <Column>
        <Row stretch>
          <strong>{group.name}</strong>
          <DropdownMenu>
            <LinkAction href={`/wagtail/groups/${group.id}/`}>
              Редактировать в Wagtail
            </LinkAction>
            <ModalAction title="Добавить сотрудника">
              {({ close }) => (
                <AddMemberToGroupModal close={close} group={group} />
              )}
            </ModalAction>
          </DropdownMenu>
        </Row>
        <Row>
          {group.permissions.map(permission => (
            <Badge key={permission.id}>{permission.name}</Badge>
          ))}
        </Row>
        {group.users.map(user => (
          <Row key={user.id}>
            <UserInfo user={user} />
            <AsyncButton small act={async () => removeUserCb(user)}>
              удалить
            </AsyncButton>
          </Row>
        ))}
      </Column>
    </Card>
  );
};

export default GroupCard;
