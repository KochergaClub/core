import React, { useReducer } from 'react';

import { Screen, InitialLoader } from '../common/types';
import Page from '../components/Page';

import { Column } from '@kocherga/frontkit';

import { loadMembers } from '~/staff/actions';

import { PbxCall } from './types';
import { listReducer } from './reducers';
import { ZadarmaContext } from './contexts';
import { getAllCalls } from './api';

import PbxCallCard from './components/PbxCallCard';

interface Props {
  pbx_calls: PbxCall[];
}

const ZadarmaIndexPage = ({ pbx_calls }: Props) => {
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

const getInitialData: InitialLoader<Props> = async ({
  api,
  store: { dispatch },
}) => {
  await dispatch(loadMembers(api));

  return {
    pbx_calls: await getAllCalls(api),
  };
};

const screen: Screen<Props> = {
  component: ZadarmaIndexPage,
  getInitialData,
};

export default screen;
