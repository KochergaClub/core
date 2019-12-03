import React, { useReducer } from 'react';

import { A } from '@kocherga/frontkit';

import { NextPage } from '~/common/types';
import Page from '~/components/Page';
import { selectAPI } from '~/core/selectors';

import { loadMembers } from '~/staff/actions';

import { PbxCall } from '~/zadarma/types';
import { singleReducer } from '~/zadarma/reducers';
import { ZadarmaContext } from '~/zadarma/contexts';
import { getCall } from '~/zadarma/api';

import PbxCallCard from '~/zadarma/components/PbxCallCard';

interface Props {
  pbx_call: PbxCall;
}

const ZadarmaCallPage: NextPage<Props> = props => {
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

ZadarmaCallPage.getInitialProps = async ({
  store: { dispatch, getState },
  query,
}) => {
  const api = selectAPI(getState());
  await dispatch(loadMembers());

  return {
    pbx_call: await getCall(api, query.id as string),
  };
};

export default ZadarmaCallPage;
