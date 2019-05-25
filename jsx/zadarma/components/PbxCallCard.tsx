import * as React from 'react';
import styled from 'styled-components';

import moment from 'moment';

import { A, Row, colors } from '@kocherga/frontkit';

import { PbxCall } from '../types';

import CallInfo from './CallInfo';
import PbxCallData from './PbxCallData';

const Container = styled.div`
  border: 1px solid ${colors.grey[200]};
  padding: 10px 20px;
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
    <Container>
      <Row gutter={40}>
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
      </Row>
    </Container>
  );
};

export default PbxCallCard;
