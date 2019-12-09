import { combineReducers } from '@reduxjs/toolkit';

import payment from './features/payment';

const reducer = combineReducers({
  payment: payment.reducer,
});

export default reducer;
