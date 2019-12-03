import { combineReducers } from 'redux';

import { subscribeChannelsSlice, mailchimpCategoriesSlice } from './slices';

export default combineReducers({
  subscribeChannels: subscribeChannelsSlice.reducer,
  mailchimpCategories: mailchimpCategoriesSlice.reducer,
});
