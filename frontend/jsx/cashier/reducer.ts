import { combineReducers } from '@reduxjs/toolkit';

import { default as payment } from './features/payment';

const reducer = combineReducers({
  payment: payment.reducer,
});

export default reducer;
