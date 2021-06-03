import { useCallback } from 'react';

import { useMutation } from '@apollo/client';

import { useExpandable, usePermissions } from '~/common/hooks';
import { Label } from '~/frontkit';
import WatchmanPicker from '~/watchmen/components/WatchmanPicker';
import { WatchmanForPickerFragment } from '~/watchmen/queries.generated';

import {
    CommonZadarmaPbxCallFragment, ZadarmaSetMemberForPbxCallDocument
} from '../queries.generated';

interface Props {
  pbx_call: CommonZadarmaPbxCallFragment;
}

const NameContainer: React.FC<{ bgColor?: string }> = ({
  children,
  bgColor,
}) => (
  <div
    className="inline w-auto p-1"
    style={{
      backgroundColor: bgColor || 'white',
    }}
  >
    {children}
  </div>
);

const StaffMemberName: React.FC<Props> = ({ pbx_call }) => {
  if (pbx_call.data && pbx_call.data.staff_member) {
    return (
      <NameContainer bgColor={pbx_call.data.staff_member.color}>
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
  const [setStaffMemberMutation] = useMutation(
    ZadarmaSetMemberForPbxCallDocument,
    {
      refetchQueries: ['ZadarmaPbxCalls', 'ZadarmaPbxCall'],
      awaitRefetchQueries: true,
    }
  );

  const { ref, flipExpand, unexpand, expanded } = useExpandable();

  const setWatchman = useCallback(
    async (watchman: WatchmanForPickerFragment) => {
      await setStaffMemberMutation({
        variables: {
          member_id: String(watchman.member.id),
          pbx_call_id: pbx_call.id,
        },
      });
      unexpand();
    },
    [unexpand, pbx_call.id, setStaffMemberMutation]
  );

  const nameEl = <StaffMemberName pbx_call={pbx_call} />;
  if (!isZadarmaAdmin) {
    return nameEl;
  }

  return (
    <div className="relative cursor-pointer" ref={ref}>
      <div onClick={flipExpand}>{nameEl}</div>
      {expanded && <WatchmanPicker pickedWatchman={setWatchman} />}
    </div>
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
