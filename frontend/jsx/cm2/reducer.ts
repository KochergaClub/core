import { combineReducers } from 'redux';

import view from './features/view';
import openOrders from './features/openOrders';
import closedOrders from './features/closedOrders';
import orderDetails from './features/orderDetails';
import orderActions from './features/orderActions';
import customers from './features/customers';
import customerDetails from './features/customerDetails';

export default combineReducers({
  openOrders: openOrders.reducer,
  closedOrders: closedOrders.reducer,
  orderDetails: orderDetails.reducer,
  orderActions: orderActions.reducer,
  customers: customers.reducer,
  customerDetails: customerDetails.reducer,
  view: view.reducer,
});
