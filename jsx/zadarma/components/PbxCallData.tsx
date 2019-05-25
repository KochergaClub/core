import * as React from 'react';
import styled from 'styled-components';

import { Label } from '@kocherga/frontkit';

import { PbxCall } from '../types';

interface Props {
  pbx_call: PbxCall;
}

const StaffMember: React.FC<Props> = ({ pbx_call }) => {
  let name = 'Неизвестно';
  if (pbx_call.data && pbx_call.data.staff_member) {
    name = pbx_call.data.staff_member.short_name;
  } else if (pbx_call.calls[0].watchman) {
    name = 'Возможно, ' + pbx_call.calls[0].watchman;
  }

  return <div>{name}</div>;
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
