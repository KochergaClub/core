import { AsyncAction } from '~/redux/store';

import { selectAPI } from '~/core/selectors';

import { KKMServer, SignMethodCalculation } from '~/kkm/kkmServer';
import { selectKkmPassword } from '~/kkm/selectors';

import { setTicketFiscalizationStatus } from './api';
import { trainingsSlice, ticketsSlice } from './slices';
import { selectTicketById, selectTrainingById } from './selectors';

import { Ticket, CreateTrainingParams } from './types';

export const TICKET_TRY_FISCALIZE = '[ratio] TICKET_TRY_FISCALIZE';
export const TICKET_FISCALIZED = '[ratio] TICKET_FISCALIZED';

export const loadTrainingTickets = (slug: string): AsyncAction => async (
  dispatch,
  getState
) => {
  const api = selectAPI(getState());
  const tickets = (await api.call(
    `ratio/training/${slug}/tickets`,
    'GET'
  )) as Ticket[];
  dispatch(ticketsSlice.actions.replaceAll(tickets));

  // TODO - save ticket ids to training-specific list
};

const tryFiscalizeTicket = (ticket_id: number) => ({
  type: TICKET_TRY_FISCALIZE as typeof TICKET_TRY_FISCALIZE,
  payload: ticket_id,
});

const fiscalizedTicket = (ticket_id: number) => ({
  type: TICKET_FISCALIZED as typeof TICKET_FISCALIZED,
  payload: ticket_id,
});

export const fiscalizeTicket = (ticket_id: number): AsyncAction => async (
  dispatch,
  getState
) => {
  const api = selectAPI(getState());
  await setTicketFiscalizationStatus(api, ticket_id, 'in_progress');

  const ticket = selectTicketById(getState(), ticket_id);
  const training = selectTrainingById(getState(), ticket.training);

  const server = new KKMServer();
  const kkmPassword = selectKkmPassword(getState());
  if (!kkmPassword) {
    throw new Error('Internal error: no kkm password'); // TODO - dispatch error instead?
  }
  server.setPassword(kkmPassword);

  dispatch(tryFiscalizeTicket(ticket_id));

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
      dispatch(fiscalizedTicket(ticket_id));
    },
    (error: object) => {
      window.alert('Fiscalization failed: ' + JSON.stringify(error));
    }
  );
};

export const loadTrainings = trainingsSlice.actions.loadAll;
export const loadTrainingBySlug = trainingsSlice.actions.loadAndView;

export const addTraining = (
  values: CreateTrainingParams
): AsyncAction => async (dispatch, getState) => {
  const api = selectAPI(getState());

  await api.call('ratio/training', 'POST', values);
  await dispatch(loadTrainings());
};

export type ActionTypes =
  | ReturnType<typeof tryFiscalizeTicket>
  | ReturnType<typeof fiscalizedTicket>;
