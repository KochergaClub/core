import React from 'react';
import { FaMinus, FaPlus, FaTrash, FaUser } from 'react-icons/fa';

import { Card } from '~/components/cards';
import DropdownMenu, { LinkAction, ModalAction, MutationAction } from '~/components/DropdownMenu';
import WagtailIcon from '~/components/icons/WagtailIcon';
import { A, Badge, Row } from '~/frontkit';

import {
    AuthGroup_ForCardFragment, AuthGroupsDocument, AuthRemoveUserFromGroupDocument,
    DeleteAuthGroupDocument
} from '../queries.generated';
import AddMemberToGroupModal from './AddMemberToGroupModal';
import { AddPermissionToGroupModal } from './AddPermissionToGroupModal';
import AddUserToGroupModal from './AddUserToGroupModal';
import { RemovePermissionFromGroupModal } from './RemovePermissionFromGroupModal';
import UserInfo from './UserInfo';

const Section: React.FC<{ title: string }> = ({ title, children }) => (
  <div>
    <div className="text-sm mb-1">{title}</div>
    <div>{children}</div>
  </div>
);

const PagePermissionsSection: React.FC<{
  permissions: AuthGroup_ForCardFragment['wagtailPagePermissions'];
}> = ({ permissions }) => {
  if (!permissions.length) {
    return null;
  }

  // TODO - pre-group permissions on server side instead
  const permissionsByPage: { [k: string]: typeof permissions } = {};

  for (const permission of permissions) {
    const key =
      permission.__typename === 'WagtailRootPagePermission'
        ? 'ROOT'
        : permission.page.id;
    if (!permissionsByPage[key]) {
      permissionsByPage[key] = [];
    }
    permissionsByPage[key].push(permission);
  }

  return (
    <Section title="Разрешения для страниц:">
      <div className="flex">
        <div className="grid justify-items-start items-center gap-x-2 gap-y-1">
          {Object.entries(permissionsByPage).map(([key, pagePermissions]) => {
            return (
              <React.Fragment key={key}>
                <div className="col-start-1">
                  {(() => {
                    switch (pagePermissions[0].__typename) {
                      case 'WagtailSpecificPagePermission':
                        return (
                          <A href={pagePermissions[0].page.meta.url}>
                            {pagePermissions[0].page.title}
                          </A>
                        );
                      case 'WagtailRootPagePermission':
                        return <div>Все страницы</div>;
                    }
                  })()}
                </div>
                <div className="col-start-2 flex space-x-1">
                  {pagePermissions.map((permission, i) => (
                    <Badge key={i}>{permission.permission_type}</Badge>
                  ))}
                </div>
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </Section>
  );
};

const CollectionPermissionsSection: React.FC<{
  permissions: AuthGroup_ForCardFragment['wagtailCollectionPermissions'];
}> = ({ permissions }) => {
  if (!permissions.length) {
    return null;
  }

  const permissionsByCollection: { [k: string]: typeof permissions } = {};

  for (const permission of permissions) {
    const key = permission.collection.id;
    if (!permissionsByCollection[key]) {
      permissionsByCollection[key] = [];
    }
    permissionsByCollection[key].push(permission);
  }
  return (
    <Section title="Разрешения для коллекций:">
      <div className="flex">
        <div className="grid justify-items-start items-center gap-x-2 gap-y-1">
          {Object.entries(permissionsByCollection).map(
            ([key, collectionPermissions]) => (
              <React.Fragment key={key}>
                <div className="col-start-1">
                  {collectionPermissions[0].collection.name}
                </div>
                <div className="col-start-2 flex space-x-1">
                  {collectionPermissions.map((permission, i) => (
                    <Badge key={i} hint={permission.permission.perm}>
                      {permission.permission.name}
                    </Badge>
                  ))}
                </div>
              </React.Fragment>
            )
          )}
        </div>
      </div>
    </Section>
  );
};

interface Props {
  group: AuthGroup_ForCardFragment;
}

export const GroupCard: React.FC<Props> = ({ group }) => {
  return (
    <Card>
      <div className="space-y-4">
        <Row stretch>
          <strong>{group.name}</strong>
          <DropdownMenu>
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
            <MutationAction
              mutation={DeleteAuthGroupDocument}
              variables={{ id: group.id }}
              refetchQueries={['AuthGroups']}
              confirmText="Группа будет удалена, и все участники группы потеряют права доступа, привязанные к группе."
              title="Удалить группу"
              icon={FaTrash}
            />
          </DropdownMenu>
        </Row>
        <Section title="Общие разрешения:">
          <div className="flex flex-wrap space-x-1">
            {group.permissions.map((permission) => (
              <div key={permission.id} className="mb-1 flex">
                <Badge hint={permission.perm}>{permission.name}</Badge>
              </div>
            ))}
          </div>
        </Section>
        <PagePermissionsSection permissions={group.wagtailPagePermissions} />
        <CollectionPermissionsSection
          permissions={group.wagtailCollectionPermissions}
        />
        {group.users.length ? (
          <Section title="Пользователи:">
            {group.users.map((user) => (
              <Row key={user.id}>
                <UserInfo user={user} />
                <DropdownMenu>
                  <MutationAction
                    mutation={AuthRemoveUserFromGroupDocument}
                    variables={{
                      group_id: group.id,
                      user_id: user.id,
                    }}
                    refetchQueries={[{ query: AuthGroupsDocument }]}
                    title="Удалить"
                    icon={FaTrash}
                  />
                </DropdownMenu>
              </Row>
            ))}
          </Section>
        ) : null}
      </div>
    </Card>
  );
};
