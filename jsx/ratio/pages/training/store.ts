import React from 'react';

import { Training, Ticket } from '../../types';

interface ReplaceTicketsAction {
  type: 'REPLACE_TICKETS';
  payload: {
    tickets: Ticket[];
  };
}

interface TryTicketFiscalizeAction {
  type: 'TRY_TICKET_FISCALIZE';
  payload: {
    ticket_id: number;
  };
}

interface TicketFiscalizedAction {
  type: 'TICKET_FISCALIZED';
  payload: {
    ticket_id: number;
  };
}

type Action =
  | ReplaceTicketsAction
  | TryTicketFiscalizeAction
  | TicketFiscalizedAction;

interface Store {
  training: Training;
  tickets: Ticket[];
}

interface TrainingContextShape {
  dispatch: (a: Action) => void;
  store: Store;
}

export const reducer = (store: Store, action: Action): Store => {
  switch (action.type) {
    case 'REPLACE_TICKETS':
      return {
        ...store,
        tickets: action.payload.tickets,
      };
    case 'TRY_TICKET_FISCALIZE':
      return {
        ...store,
        tickets: store.tickets.map(ticket =>
          ticket.id === action.payload.ticket_id
            ? {
                ...ticket,
                fiscalization_status: 'in_progress',
              }
            : ticket
        ),
      };
    case 'TICKET_FISCALIZED':
      return {
        ...store,
        tickets: store.tickets.map(ticket =>
          ticket.id === action.payload.ticket_id
            ? {
                ...ticket,
                fiscalization_status: 'fiscalized',
              }
            : ticket
        ),
      };
    default:
      return store;
  }
};

export const TrainingContext = React.createContext<TrainingContextShape>({
  dispatch: () => null,
  store: {
    training: {
      id: 0,
      name: 'fake',
      slug: 'slug',
      long_name: 'long fake name',
      date: '2000-01-01',
      salaries_paid: false,
    },
    tickets: [],
  },
});

interface KkmContextShape {
  password?: string;
}

export const KkmContext = React.createContext<KkmContextShape>({
  password: undefined,
});
