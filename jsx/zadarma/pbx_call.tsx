import React from 'react';

import { Screen, InitialLoader } from '../common/types';
import Page from '../components/Page';

import { PbxCall } from './types';

import PbxCallCard from './components/PbxCallCard';

interface Props {
  pbx_call: PbxCall;
}

const ZadarmaCallPage = ({ pbx_call }: Props) => {
  const title = `Архивный звонок ${pbx_call[0].pbx_call_id}`;
  return (
    <Page title={title} team>
      <h1>{title}</h1>
      <a href="/team/zadarma">&larr; Ко всем звонкам</a>
      <br />
      <br />
      <PbxCallCard pbx_call={pbx_call} />
    </Page>
  );
};

const getInitialData: InitialLoader<Props> = async ({ api }, params) => {
  const pbx_call = await api.call(`zadarma/pbx_call/${params.id}`, 'GET');
  return { pbx_call };
};

const screen: Screen<Props> = {
  component: ZadarmaCallPage,
  getInitialData,
};

export default screen;
