import React, { useReducer } from 'react';

import { Screen, InitialLoader } from '../common/types';
import Page from '../components/Page';

import { Column } from '@kocherga/frontkit';

import { StaffContext } from '~/staff/contexts';
import { Member as StaffMember } from '~/staff/types';

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
  const [state, dispatch] = useReducer(listReducer, pbx_calls);

  return (
    <Page title="Архив звонков" team>
      <Page.Title>Архив звонков</Page.Title>
      <Page.Main>
        <ZadarmaContext.Provider value={dispatch}>
          <StaffContext.Provider value={{ members }}>
            <Column stretch gutter={10}>
              {state.map(pbx_call => (
                <PbxCallCard pbx_call={pbx_call} key={pbx_call.pbx_call_id} />
              ))}
            </Column>
          </StaffContext.Provider>
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
