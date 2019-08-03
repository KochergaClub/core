import React, { useEffect, useReducer } from 'react';
import { useDispatch } from 'react-redux';

import { A } from '@kocherga/frontkit';

import { Screen, InitialLoader } from '~/common/types';
import Page from '~/components/Page';

import { Member as StaffMember } from '~/staff/types';
import { replaceMembers } from '~/staff/actions';

import { PbxCall } from './types';
import { singleReducer } from './reducers';
import { ZadarmaContext } from './contexts';
import { getCall, getStaffMembers } from './api';

import PbxCallCard from './components/PbxCallCard';

interface Props {
  pbx_call: PbxCall;
  members: StaffMember[];
}

const ZadarmaCallPage = (props: Props) => {
  const [state, zadarmaDispatch] = useReducer(singleReducer, props.pbx_call);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(replaceMembers(props.members));
  }, [props.members]);

  const title = `Архивный звонок ${state.pbx_call_id}`;
  return (
    <Page title={title} team>
      <Page.Title>{title}</Page.Title>
      <Page.Main>
        <ZadarmaContext.Provider value={zadarmaDispatch}>
          <A href="/team/zadarma">&larr; Ко всем звонкам</A>
          <br />
          <br />
          <PbxCallCard pbx_call={state} />
        </ZadarmaContext.Provider>
      </Page.Main>
    </Page>
  );
};

const getInitialData: InitialLoader<Props> = async ({ api }, { params }) => {
  return {
    pbx_call: await getCall(api, params.id),
    members: await getStaffMembers(api),
  };
};

const screen: Screen<Props> = {
  component: ZadarmaCallPage,
  getInitialData,
};

export default screen;
