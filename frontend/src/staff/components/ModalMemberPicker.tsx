import { useQuery } from '@apollo/client';

import { ApolloQueryResults, AsyncButton } from '~/components';
import { Column, Modal } from '~/frontkit';

import { StaffMemberForPickerFragment, StaffMembersForPickerDocument } from '../queries.generated';

interface Props {
  close: () => void;
  pick: (member: StaffMemberForPickerFragment) => Promise<void>;
}

const ModalMemberPicker: React.FC<Props> = ({ close, pick }) => {
  const queryResults = useQuery(StaffMembersForPickerDocument);

  return (
    <Modal>
      <Modal.Header close={close}>Выбрать сотрудника</Modal.Header>
      <Modal.Body>
        <ApolloQueryResults {...queryResults}>
          {({ data: { members } }) => (
            <Column stretch>
              {members
                .filter((m) => m.is_current)
                .map((member) => (
                  <AsyncButton act={() => pick(member)} key={member.id}>
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
