import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Modal, Column } from '@kocherga/frontkit';

import AsyncButton from '~/components/AsyncButton';

import { selectMembers } from '~/staff/selectors';
import { Member } from '~/staff/types';

import { Group } from '../types';
import { addMemberToGroup } from '../actions';

interface Props {
  close: () => void;
  group: Group;
}

const AddUserToGroupModal: React.FC<Props> = ({ close, group }) => {
  const members = useSelector(selectMembers);
  const dispatch = useDispatch();

  const cb = useCallback(
    async (member: Member) => {
      await dispatch(addMemberToGroup(group, member));
      close();
    },
    [dispatch, group, close]
  );

  return (
    <Modal isOpen={true}>
      <Modal.Header toggle={close}>Выбрать сотрудника</Modal.Header>
      <Modal.Body>
        <Column stretch>
          {members.map(member => (
            <AsyncButton act={() => cb(member)}>{member.full_name}</AsyncButton>
          ))}
        </Column>
      </Modal.Body>
    </Modal>
  );
};

export default AddUserToGroupModal;
