import { useCallback } from 'react';

import ModalMemberPicker from '~/staff/components/ModalMemberPicker';
import { MemberFragment } from '~/staff/codegen';

import { useAuthAddUserToGroupMutation } from '../codegen';

interface Props {
  close: () => void;
  group: { id: string };
}

const AddMemberToGroupModal: React.FC<Props> = ({ close, group }) => {
  const [addMutation] = useAuthAddUserToGroupMutation();

  const cb = useCallback(
    async (member: MemberFragment) => {
      await addMutation({
        variables: { user_id: member.user_id, group_id: group.id },
      });
      close();
    },
    [group, addMutation, close]
  );

  return <ModalMemberPicker close={close} pick={cb} />;
};

export default AddMemberToGroupModal;
