import { useCallback } from 'react';

import { useMutation } from '@apollo/client';

import ModalMemberPicker from '~/staff/components/ModalMemberPicker';
import { StaffMemberForPickerFragment } from '~/staff/queries.generated';

import { AuthAddUserToGroupDocument, AuthGroupsDocument } from '../queries.generated';

interface Props {
  close: () => void;
  group: { id: string };
}

const AddMemberToGroupModal: React.FC<Props> = ({ close, group }) => {
  const [addMutation] = useMutation(AuthAddUserToGroupDocument, {
    refetchQueries: [{ query: AuthGroupsDocument }],
    awaitRefetchQueries: true,
  });

  const cb = useCallback(
    async (member: StaffMemberForPickerFragment) => {
      await addMutation({
        variables: { user_id: member.user.id, group_id: group.id },
      });
      close();
    },
    [group, addMutation, close]
  );

  return <ModalMemberPicker close={close} pick={cb} />;
};

export default AddMemberToGroupModal;
