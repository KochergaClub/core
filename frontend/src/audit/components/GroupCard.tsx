import React, { useCallback } from 'react';
import { FaMinus, FaPlus, FaUser } from 'react-icons/fa';

import { useMutation } from '@apollo/client';

import { MutationButton } from '~/components';
import { Card } from '~/components/cards';
import DropdownMenu, { LinkAction, ModalAction } from '~/components/DropdownMenu';
import WagtailIcon from '~/components/icons/WagtailIcon';
import { AsyncButton, Badge, Column, Row } from '~/frontkit';

import {
    AuthGroup_ForCardFragment, AuthGroupsDocument, AuthRemoveUserFromGroupDocument,
    DeleteAuthGroupDocument, MaybeStaffUserFragment
} from '../queries.generated';
import AddMemberToGroupModal from './AddMemberToGroupModal';
import { AddPermissionToGroupModal } from './AddPermissionToGroupModal';
import AddUserToGroupModal from './AddUserToGroupModal';
import { RemovePermissionFromGroupModal } from './RemovePermissionFromGroupModal';
import UserInfo from './UserInfo';

interface PagePermissionBadgeProps {
  permission: AuthGroup_ForCardFragment['wagtailPagePermissions'][0];
}

const PagePermissionBadge: React.FC<PagePermissionBadgeProps> = ({
  permission,
}) => {
  switch (permission.__typename) {
    case 'WagtailSpecificPagePermission':
      return (
        <Badge>
          {permission.permission_type} for {permission.page.id}
        </Badge>
      );
    case 'WagtailRootPagePermission':
      return <Badge>{permission.permission_type}</Badge>;
    default:
      return <Badge type="accent">Неизвестный вид доступа</Badge>;
  }
};

interface Props {
  group: AuthGroup_ForCardFragment;
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
            <LinkAction
              href={`/wagtail/groups/${group.id}/`}
              title="Редактировать в Wagtail"
              icon={WagtailIcon}
            />
            <ModalAction title="Добавить сотрудника" icon={FaUser}>
              {({ close }) => (
                <AddMemberToGroupModal close={close} group={group} />
              )}
            </ModalAction>
            <ModalAction title="Добавить пользователя" icon={FaUser}>
              {({ close }) => (
                <AddUserToGroupModal close={close} group={group} />
              )}
            </ModalAction>
            <ModalAction title="Добавить разрешение" icon={FaPlus}>
              {({ close }) => (
                <AddPermissionToGroupModal close={close} group={group} />
              )}
            </ModalAction>
            <ModalAction title="Убрать разрешение" icon={FaMinus}>
              {({ close }) => (
                <RemovePermissionFromGroupModal close={close} group={group} />
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
        <small>Общие разрешения:</small>
        <Row wrap>
          {group.permissions.map((permission) => (
            <Badge key={permission.id} hint={permission.perm}>
              {permission.name}
            </Badge>
          ))}
        </Row>
        {group.wagtailPagePermissions.length ? (
          <>
            <small>Разрешения для страниц:</small>
            <Row wrap>
              {group.wagtailPagePermissions.map((permission, i) => (
                <PagePermissionBadge key={i} permission={permission} />
              ))}
            </Row>
          </>
        ) : null}
        {group.wagtailPagePermissions.length ? (
          <>
            <small>Разрешения для коллекций:</small>
            <Row wrap>
              {group.wagtailCollectionPermissions.map((permission, i) => (
                <Badge key={permission.id} hint={permission.permission.perm}>
                  {permission.collection.name} / {permission.permission.name}
                </Badge>
              ))}
            </Row>
          </>
        ) : null}
        {group.users.length ? (
          <>
            <small>Пользователи:</small>
            {group.users.map((user) => (
              <Row key={user.id}>
                <UserInfo user={user} />
                <AsyncButton size="small" act={async () => removeUserCb(user)}>
                  удалить
                </AsyncButton>
              </Row>
            ))}
          </>
        ) : null}
      </Column>
    </Card>
  );
};

export default GroupCard;
