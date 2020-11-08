import { useCallback } from 'react';

import { useMutation } from '@apollo/client';

import AdminModalUserPicker from '~/auth/components/AdminModalUserPicker';
import { UserForPickerFragment } from '~/auth/components/AdminModalUserPicker/queries.generated';

import { AuthAddUserToGroupDocument, AuthGroupsDocument } from '../queries.generated';

interface Props {
  close: () => void;
  group: { id: string };
}

const AddUserToGroupModal: React.FC<Props> = ({ close, group }) => {
  const [addMutation] = useMutation(AuthAddUserToGroupDocument, {
    refetchQueries: [{ query: AuthGroupsDocument }],
    awaitRefetchQueries: true,
  });

  const cb = useCallback(
    async (user: UserForPickerFragment) => {
      await addMutation({
        variables: { user_id: user.id, group_id: group.id },
      });
      close();
    },
    [group, addMutation, close]
  );

  return <AdminModalUserPicker close={close} pick={cb} />;
};

export default AddUserToGroupModal;
