import styled from 'styled-components';

import { parseISO } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';
import { timezone, formatDate } from '~/common/utils';

import { A } from '@kocherga/frontkit';

import { CommonZadarmaPbxCallFragment } from '../queries.generated';

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

const DateDiv = styled.div`
  font-weight: bold;
`;

interface Props {
  pbx_call: CommonZadarmaPbxCallFragment;
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

  const zonedDate = utcToZonedTime(parseISO(pbx_call.ts), timezone);

  return (
    <div>
      <Container>
        <div>
          <header>
            <DateDiv>{formatDate(zonedDate, 'd MMMM')}</DateDiv>
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
    </div>
  );
};

export default PbxCallCard;
