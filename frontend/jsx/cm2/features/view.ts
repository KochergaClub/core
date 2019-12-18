import { PayloadAction } from '@reduxjs/toolkit';
import { createExtendedSlice } from '~/redux/slices/utils';
import { AsyncAction } from '~/redux/store';

import { loadOpenOrders } from './openOrders';
import { loadClosedOrders } from './closedOrders';
import { loadOrderDetails } from './orderDetails';
import { loadCustomers } from './customers';
import { loadCustomerDetails } from './customerDetails';

interface OpenViewState {
  mode: 'open';
}

interface ClosedViewState {
  mode: 'closed';
}

interface OrderViewState {
  mode: 'order';
  id: number;
}

interface CustomersViewState {
  mode: 'customers';
}

interface CustomerDetailsViewState {
  mode: 'customer-details';
  id: number;
}

type ViewState =
  | OpenViewState
  | ClosedViewState
  | OrderViewState
  | CustomersViewState
  | CustomerDetailsViewState;

const slice = createExtendedSlice({
  name: 'cm2/view',
  initialState: { mode: 'open' } as ViewState,
  reducers: {
    viewOpen() {
      return { mode: 'open' };
    },
    viewClosed() {
      return { mode: 'closed' };
    },
    viewOrder(_, action: PayloadAction<number>) {
      return { mode: 'order', id: action.payload };
    },
    viewCustomers() {
      return { mode: 'customers' };
    },
    viewCustomerDetails(_, action: PayloadAction<number>) {
      return { mode: 'customer-details', id: action.payload };
    },
  },
});

export const viewOpen = (): AsyncAction => async dispatch => {
  await dispatch(loadCustomers()); // FIXME - always preloading all customers
  await dispatch(loadOpenOrders());
  dispatch(slice.actions.viewOpen());
};

export const viewClosed = (): AsyncAction => async dispatch => {
  await dispatch(loadClosedOrders());
  dispatch(slice.actions.viewClosed());
};

export const viewDetails = (id: number): AsyncAction => async dispatch => {
  await dispatch(loadCustomers()); // FIXME - always preloading all customers
  await dispatch(loadOrderDetails(id));
  dispatch(slice.actions.viewOrder(id));
};

export const viewCustomers = (): AsyncAction => async dispatch => {
  await dispatch(loadCustomers());
  dispatch(slice.actions.viewCustomers());
};

export const viewCustomerDetails = (
  id: number
): AsyncAction => async dispatch => {
  await dispatch(loadCustomers()); // FIXME - always preloading all customers
  await dispatch(loadCustomerDetails(id));
  dispatch(slice.actions.viewCustomerDetails(id));
};

export const updateView = (): AsyncAction => async (dispatch, getState) => {
  const state = getState();
  const selfState = slice.selectors.self(state);
  switch (selfState.mode) {
    case 'open':
      await dispatch(loadCustomers()); // FIXME - always preloading all customers
      await dispatch(loadOpenOrders());
      break;
    case 'closed':
      await dispatch(loadClosedOrders());
      break;
    case 'order':
      await dispatch(loadCustomers()); // FIXME - always preloading all customers
      await dispatch(loadOrderDetails((selfState as OrderViewState).id));
      break;
    case 'customers':
      await dispatch(loadCustomers());
      break;
    case 'customer-details':
      await dispatch(loadCustomers());
      await dispatch(
        loadCustomerDetails((selfState as CustomerDetailsViewState).id)
      );
      break;
  }
};

export const selectView = slice.selectors.self;

export default slice;
