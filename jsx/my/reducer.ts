import { combineReducers, Reducer } from 'redux';

import { Customer, Order, MyTicket } from './types';
import {
  TabName,
  TAB_OPEN,
  CM_DATA_LOADED,
  TICKETS_LOADED,
  Action,
} from './actions';

interface UIState {
  tab: TabName;
}

const uiReducer: Reducer<UIState, Action> = (
  state = { tab: 'tickets' },
  action
) => {
  switch (action.type) {
    case TAB_OPEN:
      return { tab: action.payload };
    default:
      return state;
  }
};

type CmState = {
  customer?: Customer;
  orders_count: number;
  orders: Order[];
} | null;

const cmReducer: Reducer<CmState, Action> = (state = null, action) => {
  switch (action.type) {
    case CM_DATA_LOADED:
      return action.payload;
    default:
      return state;
  }
};

type TicketsState = MyTicket[];

const ticketsReducer: Reducer<TicketsState, Action> = (state = [], action) => {
  switch (action.type) {
    case TICKETS_LOADED:
      return action.payload;
    default:
      return state;
  }
};

const reducer = combineReducers({
  ui: uiReducer,
  cm: cmReducer,
  tickets: ticketsReducer,
});

export default reducer;
