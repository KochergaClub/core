import React, { useCallback } from 'react';

import { useMutation } from '@apollo/client';

import { Badge, Column, Modal } from '~/frontkit';

import {
    AuthGroup_ForCardFragment, RemovePermissionFromAuthGroupDocument
} from '../queries.generated';

interface Props {
  close: () => void;
  group: AuthGroup_ForCardFragment;
}

export const RemovePermissionFromGroupModal: React.FC<Props> = ({
  close,
  group,
}) => {
  const [removeMutation] = useMutation(RemovePermissionFromAuthGroupDocument);

  const pick = useCallback(
    async (perm: string) => {
      await removeMutation({
        variables: { group_id: group.id, perm },
      });
      close();
    },
    [group, removeMutation, close]
  );

  return (
    <Modal>
      <Modal.Header close={close}>Удалить разрешение</Modal.Header>
      <Modal.Body>
        <Column>
          {group.permissions.map((permission) => (
            <div key={permission.id}>
              <a
                href=""
                onClick={(e) => {
                  e.preventDefault();
                  pick(permission.perm);
                }}
              >
                <Badge>{permission.name}</Badge>
              </a>
            </div>
          ))}
        </Column>
      </Modal.Body>
    </Modal>
  );
};
