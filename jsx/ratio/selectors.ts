import { createSelector, Selector } from 'reselect';

import { State } from '~/redux/store';

import { ticketsSlice, trainingsSlice, trainersSlice } from './slices';
import { Training, Ticket, Trainer } from './types';

// Weird helper.
// Is it really impossible to write createSelector in any other way?
const selectId = (_: State, id: number) => id;

// Trainings

export const selectTrainingsSlice: Selector<
  State,
  ReturnType<typeof trainingsSlice.reducer>
> = state => state.ratio.trainings;

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

export const selectTrainingById = createSelector(
  [selectTrainingsSlice, selectId],
  (slice, id: number) => slice.byId[id]
);

// Tickets

const selectTicketsSlice: Selector<
  State,
  ReturnType<typeof ticketsSlice.reducer>
> = state => state.ratio.tickets;

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

export const selectTicketById = createSelector(
  [selectTicketsSlice, selectId],
  (slice, id: number) => slice.byId[id]
);

// Trainers

const selectTrainersSlice: Selector<
  State,
  ReturnType<typeof trainersSlice.reducer>
> = state => state.ratio.trainers;

export const selectTrainers: Selector<State, Trainer[]> = createSelector(
  selectTrainersSlice,
  trainersSlice.selectors.selectAll
);
