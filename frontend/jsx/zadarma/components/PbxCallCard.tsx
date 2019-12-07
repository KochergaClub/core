import React from 'react';
import styled from 'styled-components';

import moment from 'moment';

import { A } from '@kocherga/frontkit';

//test
import Card from '~/components/Card';

import { PbxCall } from '../types';

import CallInfo from './CallInfo';
import PbxCallData from './PbxCallData';

const Container = styled.div`
  display: flex;
  > * + * {
    margin-left: 40px;
  }
  > * {
    flex: 1;
  }
`;

const Date = styled.div`
  font-weight: bold;
`;

interface Props {
  pbx_call: PbxCall;
}

const PbxCallCard: React.FC<Props> = ({ pbx_call }) => {
  const call_type = pbx_call.calls[0].call_type;

  let title = 'Странный тип звонка';
  if (call_type === 'outcoming') {
    title = `Кочерга → ${pbx_call.calls[0].destination}`;
  } else if (call_type === 'incoming') {
    let clid = pbx_call.calls[0].clid;
    const match = clid.match(/<(.*?)>/);
    if (match) {
      clid = match[1];
    }
    title = `${clid} → Кочерга`;
  }

  return (
    <Card>
      <Container>
        <div>
          <header>
            <Date>{moment(pbx_call.ts).format('D MMMM')}</Date>
            <A href={`/team/zadarma/pbx_call/${pbx_call.pbx_call_id}`}>
              {title}
            </A>
          </header>
          {pbx_call.calls.map(call => (
            <CallInfo key={call.call_id} call={call} />
          ))}
        </div>
        <PbxCallData pbx_call={pbx_call} />
      </Container>
    </Card>
  );
};

export default PbxCallCard;