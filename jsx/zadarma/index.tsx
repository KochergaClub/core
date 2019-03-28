import * as React from 'react';

import moment from 'moment';

import Page from '../components/Page';

import { Row } from '@kocherga/frontkit';

interface Call {
  ts: string;
  call_id: string;
  pbx_call_id: string;
  call_type: string;
  disposition: string;
  is_recorded: number;
  watchman?: string;
  record?: string;
}

interface Props {
  calls: Call[];
}

const Call = ({ call }: { call: Call }) => {
  const m = moment.parseZone(call.ts);
  return (
    <Row style={{ alignItems: 'center', marginBottom: 15 }}>
      <a href={`/team/zadarma/${call.call_id}`}>
        <time dateTime={call.ts}>{m.format('D MMMM HH:mm')}</time>
      </a>
      {call.record && <audio controls src={call.record} />}
    </Row>
  );
};

export default ({ calls }: Props) => {
  return (
    <Page title="Архив звонков" team>
      <h1>Архив звонков</h1>
      {calls
        .filter(call => call.record)
        .map(call => <Call call={call} key={call.call_id} />)}
    </Page>
  );
};
