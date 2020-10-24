import { useCallback } from 'react';

import { useMutation } from '@apollo/client';
import { Column, Row } from '~/frontkit';

import { AsyncButton, Badge } from '~/components';
import Card from '~/components/Card';
import DropdownMenu, { LinkAction, ModalAction } from '~/components/DropdownMenu';

import {
    AuthGroupsDocument, AuthGroupsQuery, AuthRemoveUserFromGroupDocument, MaybeStaffUserFragment
} from '../queries.generated';
import AddMemberToGroupModal from './AddMemberToGroupModal';
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
          </DropdownMenu>
        </Row>
        <Row wrap={true}>
          {group.permissions.map((permission) => (
            <Badge key={permission.id}>{permission.name}</Badge>
          ))}
        </Row>
        {group.users.map((user) => (
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
