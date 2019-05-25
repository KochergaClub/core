import React from 'react';
import styled from 'styled-components';

import moment from 'moment';
import 'moment/locale/ru';

import { Call } from '../types';
import DispositionLabel from './DispositionLabel';

const Container = styled.div`
  display: flex;
  align-items: center;
  height: 60px;

  & > * + * {
    margin-left: 8px;
  }
`;

const CallInfo = ({ call }: { call: Call }) => {
  const m = moment.parseZone(call.ts);
  return (
    <Container>
      <time dateTime={call.ts}>{m.format('HH:mm:ss')}</time>
      <DispositionLabel>{call.disposition}</DispositionLabel>
      <div>{call.sip}</div>
      {call.record && <audio controls src={call.record} />}
    </Container>
  );
};

export default CallInfo;
