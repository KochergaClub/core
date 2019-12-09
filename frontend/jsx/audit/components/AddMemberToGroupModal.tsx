import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import ModalMemberPicker from '~/staff/components/ModalMemberPicker';

import { Member } from '~/staff/types';

import { Group } from '../types';
import { addMemberToGroup } from '../features/groups';

interface Props {
  close: () => void;
  group: Group;
}

const AddMemberToGroupModal: React.FC<Props> = ({ close, group }) => {
  const dispatch = useDispatch();

  const cb = useCallback(
    async (member: Member) => {
      await dispatch(addMemberToGroup(group, member));
      close();
    },
    [dispatch, group, close]
  );

  return <ModalMemberPicker close={close} pick={cb} />;
};

export default AddMemberToGroupModal;
