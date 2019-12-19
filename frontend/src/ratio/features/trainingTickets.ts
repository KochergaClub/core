import { createSelector, PayloadAction } from '@reduxjs/toolkit';

import { AsyncAction, State } from '~/redux/store';
import { createExtendedSlice } from '~/redux/slices/utils';
import { selectAPI } from '~/core/selectors';

import { KKMServer, SignMethodCalculation } from '~/kkm/kkmServer';
import { selectKkmPassword } from '~/kkm/selectors';

import { setTicketFiscalizationStatus } from '../api';
import { Ticket } from '../types';

import { selectTraining } from './trainingItem';

interface SliceState {
  ids: number[];
  byId: {
    [k: number]: Ticket;
  };
}

const slice = createExtendedSlice({
  name: 'ratio/trainingTickets',
  initialState: {
    ids: [],
    byId: {},
  } as SliceState,
  reducers: {
    set: (state, action: PayloadAction<Ticket[]>) => {
      state.ids = action.payload.map(ticket => ticket.id);
      state.byId = {};
      for (const ticket of action.payload) {
        state.byId[ticket.id] = ticket;
      }
    },
    tryFiscalizeTicket: (state, action: PayloadAction<number>) => {
      const ticket = state.byId[action.payload];
      ticket.fiscalization_status = 'in_progress';
    },
    fiscalizedTicket: (state, action: PayloadAction<number>) => {
      const ticket = state.byId[action.payload];
      ticket.fiscalization_status = 'fiscalized';
    },
  },
});

/***************** selectors ***************/
const selectId = (_: State, id: number) => id;

export const selectTicketById = createSelector(
  [slice.selectors.self, selectId],
  (state, id: number) => state.byId[id]
);

export const selectTrainingTickets = createSelector(
  slice.selectors.self,
  state => state.ids.map(id => state.byId[id])
);

// TODO

/***************** thunks ****************/
export const loadTrainingTickets = (slug: string): AsyncAction => async (
  dispatch,
  getState
) => {
  const api = selectAPI(getState());
  const tickets = (await api.call(
    `ratio/training/${slug}/tickets`,
    'GET'
  )) as Ticket[];
  dispatch(slice.actions.set(tickets));
};

export const fiscalizeTicket = (ticket_id: number): AsyncAction => async (
  dispatch,
  getState
) => {
  const api = selectAPI(getState());
  await setTicketFiscalizationStatus(api, ticket_id, 'in_progress');

  const ticket = selectTicketById(getState(), ticket_id);
  const training = selectTraining(getState());
  if (!training) {
    throw new Error('Internal logic error - no training selected');
  }
  if (training.id !== ticket.training) {
    throw new Error(
      "Internal logic error - training id doesn't match ticket's training id"
    );
  }

  const server = new KKMServer();
  const kkmPassword = selectKkmPassword(getState());
  if (!kkmPassword) {
    throw new Error('Internal error: no kkm password'); // TODO - dispatch error instead?
  }
  server.setPassword(kkmPassword);

  dispatch(slice.actions.tryFiscalizeTicket(ticket_id));

  const request = {
    title: `Участие в мероприятии: ${training.name}`,
    signMethodCalculation: SignMethodCalculation.PrePayment100,
    email: ticket.email,
    sum: ticket.payment_amount,
  };

  // FIXME - await server.call
  server.call(
    server.getCheckRequest(request),
    async () => {
      await setTicketFiscalizationStatus(api, ticket_id, 'fiscalized');
      dispatch(slice.actions.fiscalizedTicket(ticket_id));
    },
    (error: object) => {
      window.alert('Fiscalization failed: ' + JSON.stringify(error));
    }
  );
};

export default slice;
