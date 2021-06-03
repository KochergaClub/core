import { parseISO } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';

import { formatDate, timezone } from '~/common/utils';

import { CommonZadarmaPbxCallFragment } from '../queries.generated';
import DispositionLabel from './DispositionLabel';

type Call = CommonZadarmaPbxCallFragment['calls'][0];

const CallInfo = ({ call }: { call: Call }) => {
  const zonedDate = utcToZonedTime(parseISO(call.ts), timezone);

  return (
    <div className="flex items-center h-16 space-x-2">
      <time dateTime={call.ts}>{formatDate(zonedDate, 'HH:mm:ss')}</time>
      <DispositionLabel>{call.disposition}</DispositionLabel>
      <div>{call.sip}</div>
      {call.record && <audio controls src={call.record} />}
    </div>
  );
};

export default CallInfo;
