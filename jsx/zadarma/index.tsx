import React, { useEffect, useReducer } from 'react';
import { useDispatch } from 'react-redux';

import { Screen, InitialLoader } from '../common/types';
import Page from '../components/Page';

import { Column } from '@kocherga/frontkit';

import { Member as StaffMember } from '~/staff/types';
import { replaceMembers } from '~/staff/actions';

import { PbxCall } from './types';
import { listReducer } from './reducers';
import { ZadarmaContext } from './contexts';
import { getAllCalls, getStaffMembers } from './api';

import PbxCallCard from './components/PbxCallCard';

interface Props {
  pbx_calls: PbxCall[];
  members: StaffMember[];
}

const ZadarmaIndexPage = ({ pbx_calls, members }: Props) => {
  const [state, zadarmaDispatch] = useReducer(listReducer, pbx_calls);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(replaceMembers(members));
  }, [members]);

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

const getInitialData: InitialLoader<Props> = async ({ api }) => {
  return {
    pbx_calls: await getAllCalls(api),
    members: await getStaffMembers(api),
  };
};

const screen: Screen<Props> = {
  component: ZadarmaIndexPage,
  getInitialData,
};

export default screen;
