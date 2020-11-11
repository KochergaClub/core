import React, { useCallback } from 'react';

import { useMutation, useQuery } from '@apollo/client';

import { ApolloQueryResults } from '~/components';
import { Badge, Column, Modal } from '~/frontkit';

import {
    AddPermissionToAuthGroupDocument, AuthPermissionsForPickerDocument
} from '../queries.generated';

interface PickerProps {
  pick: (perm: string) => Promise<void>;
}

const PermissionPicker: React.FC<PickerProps> = ({ pick }) => {
  const queryResults = useQuery(AuthPermissionsForPickerDocument);
  return (
    <ApolloQueryResults {...queryResults}>
      {({ data: { permissions } }) => (
        <Column>
          {permissions.map((permission) => (
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
      )}
    </ApolloQueryResults>
  );
};

interface Props {
  close: () => void;
  group: { id: string };
}

export const AddPermissionToGroupModal: React.FC<Props> = ({
  close,
  group,
}) => {
  const [addMutation] = useMutation(AddPermissionToAuthGroupDocument);

  const cb = useCallback(
    async (perm: string) => {
      await addMutation({
        variables: { group_id: group.id, perm },
      });
      close();
    },
    [group, addMutation, close]
  );

  return (
    <Modal>
      <Modal.Header close={close}>Выбрать разрешение</Modal.Header>
      <Modal.Body>
        <PermissionPicker pick={cb} />
      </Modal.Body>
    </Modal>
  );
};
