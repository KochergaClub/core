import { useCallback } from 'react';

import styled from 'styled-components';

import { Label } from '@kocherga/frontkit';

import { usePermissions, useExpandable } from '~/common/hooks';

import WatchmanPicker from '~/watchmen/components/WatchmanPicker';
import { WatchmanForPickerFragment } from '~/watchmen/queries.generated';

import {
  CommonZadarmaPbxCallFragment,
  useZadarmaSetMemberForPbxCallMutation,
} from '../queries.generated';

interface Props {
  pbx_call: CommonZadarmaPbxCallFragment;
}

const Container = styled.div`
  position: relative;
  cursor: pointer;
`;

const NameContainer = styled.div`
  display: inline;
  width: auto;
  padding: 4px;
`;

const StaffMemberName: React.FC<Props> = ({ pbx_call }) => {
  if (pbx_call.data && pbx_call.data.staff_member) {
    return (
      <NameContainer
        style={{ backgroundColor: pbx_call.data.staff_member.color || 'white' }}
      >
        {pbx_call.data.staff_member.short_name}
      </NameContainer>
    );
  } else if (pbx_call.calls[0].watchman) {
    return (
      <NameContainer>{pbx_call.calls[0].watchman} (возможно)</NameContainer>
    );
  }
  return <NameContainer>Неизвестно</NameContainer>;
};

const StaffMember: React.FC<Props> = ({ pbx_call }) => {
  const [isZadarmaAdmin] = usePermissions(['zadarma.admin']);
  const [setStaffMemberMutation] = useZadarmaSetMemberForPbxCallMutation();

  const { ref, flipExpand, unexpand, expanded } = useExpandable();

  const setWatchman = useCallback(
    async (watchman: WatchmanForPickerFragment) => {
      await setStaffMemberMutation({
        variables: {
          member_id: String(watchman.member.id),
          pbx_call_id: pbx_call.pbx_call_id,
        },
      });
      unexpand();
    },
    [unexpand, pbx_call.pbx_call_id]
  );

  const nameEl = <StaffMemberName pbx_call={pbx_call} />;
  if (!isZadarmaAdmin) {
    return nameEl;
  }

  return (
    <Container ref={ref}>
      <div onClick={flipExpand}>{nameEl}</div>
      {expanded && <WatchmanPicker pickedWatchman={setWatchman} />}
    </Container>
  );
};

const PbxCallData: React.FC<Props> = ({ pbx_call }) => {
  return (
    <div>
      <Label>Кто отвечал:</Label>
      <StaffMember pbx_call={pbx_call} />
    </div>
  );
};

export default PbxCallData;
