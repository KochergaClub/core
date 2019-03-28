import * as React from 'react';

import Page from '../components/Page';

import { Column } from '@kocherga/frontkit';

import { PbxCall } from './types';

import PbxCallCard from './components/PbxCallCard';

interface Props {
  pbx_calls: PbxCall[];
}

export default ({ pbx_calls }: Props) => {
  return (
    <Page title="Архив звонков" team>
      <h1>Архив звонков</h1>
      <Column stretch gutter={10}>
        {pbx_calls.map(pbx_call => (
          <PbxCallCard pbx_call={pbx_call} key={pbx_call[0].pbx_call_id} />
        ))}
      </Column>
    </Page>
  );
};
