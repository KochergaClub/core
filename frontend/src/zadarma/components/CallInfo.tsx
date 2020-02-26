import styled from 'styled-components';

import { parseISO } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';

import { timezone, formatDate } from '~/common/utils';

import DispositionLabel from './DispositionLabel';

import { CommonZadarmaPbxCallFragment } from '../queries.generated';

const Container = styled.div`
  display: flex;
  align-items: center;
  height: 60px;

  & > * + * {
    margin-left: 8px;
  }
`;

type Call = CommonZadarmaPbxCallFragment['calls'][0];

const CallInfo = ({ call }: { call: Call }) => {
  const zonedDate = utcToZonedTime(parseISO(call.ts), timezone);

  return (
    <Container>
      <time dateTime={call.ts}>{formatDate(zonedDate, 'HH:mm:ss')}</time>
      <DispositionLabel>{call.disposition}</DispositionLabel>
      <div>{call.sip}</div>
      {call.record && <audio controls src={call.record} />}
    </Container>
  );
};

export default CallInfo;
