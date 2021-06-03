import { parseISO } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';

import { formatDate, timezone } from '~/common/utils';
import { A } from '~/frontkit';

import { CommonZadarmaPbxCallFragment } from '../queries.generated';
import CallInfo from './CallInfo';
import PbxCallData from './PbxCallData';

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
      <div className="flex space-x-10">
        <div className="flex-1">
          <header>
            <div className="font-bold">{formatDate(zonedDate, 'd MMMM')}</div>
            <A href={`/team/zadarma/pbx_call/${pbx_call.id}`}>{title}</A>
          </header>
          {pbx_call.calls.map((call) => (
            <CallInfo key={call.id} call={call} />
          ))}
        </div>
        <div className="flex-1">
          <PbxCallData pbx_call={pbx_call} />
        </div>
      </div>
    </div>
  );
};

export default PbxCallCard;
