import React, { useState, useCallback, useRef } from 'react';
import styled from 'styled-components';

import useOnClickOutside from 'use-onclickoutside';

import { Label } from '@kocherga/frontkit';

import { useAPI } from '~/common/hooks';

import Picker from '~/staff/components/Picker';
import { Member } from '~/staff/types';

import { PbxCall } from '../types';

interface Props {
  pbx_call: PbxCall;
}

const Container = styled.div`
  position: relative;
  cursor: pointer;
`;

const useExpandable = () => {
  const [expanded, setExpanded] = useState(false);

  const flipExpand = useCallback(
    () => {
      setExpanded(!expanded);
    },
    [expanded]
  );

  const unexpand = useCallback(() => {
    setExpanded(false);
  }, []);

  const ref = useRef(null);
  useOnClickOutside(ref, unexpand);

  return {
    expanded,
    flipExpand,
    unexpand,
    ref,
  };
};

const StaffMember: React.FC<Props> = ({ pbx_call }) => {
  let name = 'Неизвестно';
  if (pbx_call.data && pbx_call.data.staff_member) {
    name = pbx_call.data.staff_member.short_name;
  } else if (pbx_call.calls[0].watchman) {
    name = pbx_call.calls[0].watchman + ' (возможно)';
  }

  const api = useAPI();

  const { ref, flipExpand, unexpand, expanded } = useExpandable();

  const setStaffMember = useCallback(
    async (member: Member) => {
      await api.call(
        `zadarma/pbx_call/${pbx_call.pbx_call_id}/set_staff_member`,
        'POST',
        {
          id: member.id,
        }
      );
      window.location.reload();
    },
    [api, pbx_call.pbx_call_id]
  );

  return (
    <Container ref={ref}>
      <div onClick={flipExpand}>{name}</div>
      {expanded && <Picker pickedMember={setStaffMember} />}
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
