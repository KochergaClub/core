import * as React from 'react';
import { useSelector } from 'react-redux';

import { Modal, Column } from '@kocherga/frontkit';

import AsyncButton from '~/components/AsyncButton';

import { selectMembers } from '../selectors';
import { Member } from '../types';

interface Props {
  close: () => void;
  pick: (member: Member) => Promise<void>;
}

const ModalMemberPicker: React.FC<Props> = ({ close, pick }) => {
  const members = useSelector(selectMembers);

  return (
    <Modal isOpen={true}>
      <Modal.Header toggle={close}>Выбрать сотрудника</Modal.Header>
      <Modal.Body>
        <Column stretch>
          {members
            .filter(m => m.is_current)
            .map(member => (
              <AsyncButton act={() => pick(member)}>
                {member.full_name}
              </AsyncButton>
            ))}
        </Column>
      </Modal.Body>
    </Modal>
  );
};

export default ModalMemberPicker;
