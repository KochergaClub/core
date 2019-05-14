import { createContext } from 'react';

import { Customer, MyTicket } from './types';

interface MyStore {
  customer?: Customer;
  tickets: MyTicket[];
}
export interface ReplaceCustomerAction {
  type: 'REPLACE_CUSTOMER';
  payload: {
    customer?: Customer;
  };
}

export interface ReplaceTicketsAction {
  type: 'REPLACE_TICKETS';
  payload: {
    tickets: MyTicket[];
  };
}

export type Action = ReplaceCustomerAction | ReplaceTicketsAction;

export const reducer = (store: MyStore, action: Action) => {
  switch (action.type) {
    case 'REPLACE_CUSTOMER':
      return {
        ...store,
        customer: action.payload.customer,
      };
    case 'REPLACE_TICKETS':
      return {
        ...store,
        tickets: action.payload.tickets,
      };
    default:
      return store;
  }
};

type MyDispatchShape = (a: Action) => void;

export const MyDispatch = createContext<MyDispatchShape>(() => null);
