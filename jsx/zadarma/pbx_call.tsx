import React from 'react';

import { A } from '@kocherga/frontkit';

import { Screen, InitialLoader } from '~/common/types';
import Page from '~/components/Page';

import { StaffContext } from '~/staff/contexts';
import { Member as StaffMember } from '~/staff/types';

import { PbxCall } from './types';

import PbxCallCard from './components/PbxCallCard';

interface Props {
  pbx_call: PbxCall;
  members: StaffMember[];
}

const ZadarmaCallPage = ({ pbx_call, members }: Props) => {
  const title = `Архивный звонок ${pbx_call.pbx_call_id}`;
  return (
    <Page title={title} team>
      <Page.Title>{title}</Page.Title>
      <Page.Main>
        <StaffContext.Provider value={{ members }}>
          <A href="/team/zadarma">&larr; Ко всем звонкам</A>
          <br />
          <br />
          <PbxCallCard pbx_call={pbx_call} />
        </StaffContext.Provider>
      </Page.Main>
    </Page>
  );
};

const getInitialData: InitialLoader<Props> = async ({ api }, { params }) => {
  const pbx_call = await api.call(`zadarma/pbx_call/${params.id}`, 'GET');
  const staffMembers = (await api.call('staff/member', 'GET')) as StaffMember[];
  return { pbx_call, members: staffMembers };
};

const screen: Screen<Props> = {
  component: ZadarmaCallPage,
  getInitialData,
};

export default screen;
