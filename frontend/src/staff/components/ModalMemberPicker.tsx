import { Modal, Column } from '@kocherga/frontkit';

import { AsyncButton, ApolloQueryResults } from '~/components';

import { useStaffMembersQuery, StaffMemberForPickerFragment } from '../codegen';

interface Props {
  close: () => void;
  pick: (member: StaffMemberForPickerFragment) => Promise<void>;
}

const ModalMemberPicker: React.FC<Props> = ({ close, pick }) => {
  const queryResults = useStaffMembersQuery();

  return (
    <Modal isOpen={true}>
      <Modal.Header toggle={close}>Выбрать сотрудника</Modal.Header>
      <Modal.Body>
        <ApolloQueryResults {...queryResults}>
          {({ data: { staffMembersAll: members } }) => (
            <Column stretch>
              {members
                .filter(m => m.is_current)
                .map(member => (
                  <AsyncButton act={() => pick(member)}>
                    {member.full_name}
                  </AsyncButton>
                ))}
            </Column>
          )}
        </ApolloQueryResults>
      </Modal.Body>
    </Modal>
  );
};

export default ModalMemberPicker;
