import * as React from 'react';
import styled from 'styled-components';

import moment from 'moment';

import { A, Row } from '@kocherga/frontkit';

import { PbxCall } from '../types';

import CallCard from './CallCard';

const Container = styled.div`
  border: 1px solid #ddd;
  padding: 10px 20px;
`;

const PbxCallCard = ({ pbx_call }: { pbx_call: PbxCall }) => {
  const pbx_call_id = pbx_call[0].pbx_call_id;
  const call_type = pbx_call[0].call_type;

  let title = 'Странный тип звонка';
  if (call_type === 'outcoming') {
    title = `Кочерга → ${pbx_call[0].destination}`;
  } else if (call_type === 'incoming') {
    let clid = pbx_call[0].clid;
    const match = clid.match(/<(.*?)>/);
    if (match) {
      clid = match[1];
    }
    title = `${clid} → Кочерга`;
  }
  return (
    <Container>
      <header>
        <Row spaced>
          <A href={`/team/zadarma/pbx_call/${pbx_call_id}`}>{title}</A>
          <div>{moment(pbx_call[0].ts).format('D MMMM')}</div>
        </Row>
      </header>
      {pbx_call.map(call => <CallCard key={call.call_id} call={call} />)}
    </Container>
  );
};

export default PbxCallCard;
