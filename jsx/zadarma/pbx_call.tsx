import React, { useReducer } from 'react';

import { A } from '@kocherga/frontkit';

import { Screen, InitialLoader } from '~/common/types';
import Page from '~/components/Page';

import { loadMembers } from '~/staff/actions';

import { PbxCall } from './types';
import { singleReducer } from './reducers';
import { ZadarmaContext } from './contexts';
import { getCall } from './api';

import PbxCallCard from './components/PbxCallCard';

interface Props {
  pbx_call: PbxCall;
}

const ZadarmaCallPage = (props: Props) => {
  const [state, zadarmaDispatch] = useReducer(singleReducer, props.pbx_call);

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

const getInitialData: InitialLoader<Props> = async (
  { api, store: { dispatch } },
  { params }
) => {
  await dispatch(loadMembers(api));

  return {
    pbx_call: await getCall(api, params.id),
  };
};

const screen: Screen<Props> = {
  component: ZadarmaCallPage,
  getInitialData,
};

export default screen;
