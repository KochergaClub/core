import React, { useReducer } from 'react';

import { NextPage } from '~/common/types';
import Page from '~/components/Page';
import { selectAPI } from '~/core/selectors';

import { Column } from '@kocherga/frontkit';

import { loadMembers } from '~/staff/actions';

import { PbxCall } from '~/zadarma/types';
import { listReducer } from '~/zadarma/reducers';
import { ZadarmaContext } from '~/zadarma/contexts';
import { getAllCalls } from '~/zadarma/api';

import PbxCallCard from '~/zadarma/components/PbxCallCard';

interface Props {
  pbx_calls: PbxCall[];
}

const ZadarmaIndexPage: NextPage<Props> = ({ pbx_calls }) => {
  const [state, zadarmaDispatch] = useReducer(listReducer, pbx_calls);

  return (
    <Page title="Архив звонков" team>
      <Page.Title>Архив звонков</Page.Title>
      <Page.Main>
        <ZadarmaContext.Provider value={zadarmaDispatch}>
          <Column stretch gutter={10}>
            {state.map(pbx_call => (
              <PbxCallCard pbx_call={pbx_call} key={pbx_call.pbx_call_id} />
            ))}
          </Column>
        </ZadarmaContext.Provider>
      </Page.Main>
    </Page>
  );
};

ZadarmaIndexPage.getInitialProps = async ({
  store: { getState, dispatch },
}) => {
  const api = selectAPI(getState());
  await dispatch(loadMembers());

  return {
    pbx_calls: await getAllCalls(api),
  };
};

export default ZadarmaIndexPage;
