import React from 'react';

import { Screen, InitialLoader } from '../common/types';
import Page from '../components/Page';

import { Column } from '@kocherga/frontkit';

import { PbxCall } from './types';

import PbxCallCard from './components/PbxCallCard';

interface Props {
  pbx_calls: PbxCall[];
}

const ZadarmaIndexPage = ({ pbx_calls }: Props) => {
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

const getInitialData: InitialLoader<Props> = async ({ api }) => {
  const pbx_calls = await api.call('zadarma/pbx_call', 'GET');
  return { pbx_calls };
};

const screen: Screen<Props> = {
  component: ZadarmaIndexPage,
  getInitialData,
};

export default screen;
