import { subscribeChannelsSlice, mailchimpCategoriesSlice } from './slices';

export const loadSubscribeChannels = subscribeChannelsSlice.actions.loadAll;
export const loadMailchimpCategories = mailchimpCategoriesSlice.actions.loadAll;
