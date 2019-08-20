import { createSelector, Selector } from 'reselect';

import { State } from '~/redux/store';

import { ticketsSlice, trainingsSlice } from './slices';
import { Training, Ticket } from './types';

export const selectTrainingsSlice: Selector<
  State,
  ReturnType<typeof trainingsSlice.reducer>
> = state => state.ratio.trainings;

const selectTicketsSlice: Selector<
  State,
  ReturnType<typeof ticketsSlice.reducer>
> = state => state.ratio.tickets;

export const selectTrainings: Selector<State, Training[]> = createSelector(
  selectTrainingsSlice,
  trainingsSlice.selectors.selectAll
);

export const selectViewingTraining: Selector<
  State,
  Training | undefined
> = createSelector(
  selectTrainingsSlice,
  trainingsSlice.selectors.selectViewing
);

export const selectViewingTrainingTickets: Selector<
  State,
  Ticket[]
> = createSelector(
  [selectViewingTraining, selectTicketsSlice],
  (training: Training | undefined, ticketsSlice) => {
    if (!training) {
      return [];
    }
    return ticketsSlice.ids
      .map(id => ticketsSlice.byId[id])
      .filter(ticket => ticket.training === training.id);
  }
);

// wat. is it really impossible to write createSelector in any other way?
const selectId = (_: State, id: number) => id;

export const selectTrainingById = createSelector(
  [selectTrainingsSlice, selectId],
  (slice, id: number) => slice.byId[id]
);

export const selectTicketById = createSelector(
  [selectTicketsSlice, selectId],
  (slice, id: number) => slice.byId[id]
);
