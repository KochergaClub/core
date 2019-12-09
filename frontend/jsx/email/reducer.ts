import { combineReducers } from 'redux';

import subscribeChannels from './features/subscribeChannels';
import mailchimpCategories from './features/mailchimpCategories';

export default combineReducers({
  subscribeChannels: subscribeChannels.reducer,
  mailchimpCategories: mailchimpCategories.reducer,
});
