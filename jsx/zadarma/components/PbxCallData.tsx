import React, { useCallback, useContext } from 'react';
import styled from 'styled-components';

import { Label } from '@kocherga/frontkit';

import GlobalContext from '~/components/GlobalContext';

import { useAPI, useExpandable } from '~/common/hooks';

import WatchmanPicker from '~/staff/components/WatchmanPicker';
import { Member } from '~/staff/types';

import { PbxCall } from '../types';
import { ZadarmaContext } from '../contexts';

interface Props {
  pbx_call: PbxCall;
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
        style={{ backgroundColor: pbx_call.data.staff_member.color }}
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
  const { user } = useContext(GlobalContext);

  const { ref, flipExpand, unexpand, expanded } = useExpandable();

  const api = useAPI();

  const dispatch = useContext(ZadarmaContext);

  const setStaffMember = useCallback(
    async (member: Member) => {
      await api.call(
        `zadarma/pbx_call/${pbx_call.pbx_call_id}/set_staff_member`,
        'POST',
        {
          id: member.id,
        }
      );
      dispatch({
        type: 'UPDATE_STAFF_MEMBER',
        payload: {
          pbx_call_id: pbx_call.pbx_call_id,
          staff_member: member,
        },
      });
      unexpand();
    },
    [api, dispatch, unexpand, pbx_call.pbx_call_id]
  );

  const nameEl = <StaffMemberName pbx_call={pbx_call} />;
  if (!user.permissions.includes('zadarma.admin')) {
    return nameEl;
  }

  return (
    <Container ref={ref}>
      <div onClick={flipExpand}>{nameEl}</div>
      {expanded && <WatchmanPicker pickedMember={setStaffMember} />}
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
