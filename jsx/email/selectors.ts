import { createSelector, Selector } from 'reselect';

import { State } from '~/redux/store';

import { subscribeChannelsSlice, mailchimpCategoriesSlice } from './slices';
import { SubscribeChannel, MailchimpCategory } from './types';

export const selectSubscribeChannelsSlice: Selector<
  State,
  ReturnType<typeof subscribeChannelsSlice.reducer>
> = state => state.email.subscribeChannels;

export const selectSubscribeChannels: Selector<
  State,
  SubscribeChannel[]
> = createSelector(
  selectSubscribeChannelsSlice,
  subscribeChannelsSlice.selectors.selectAll
);

export const selectMailchimpCategoriesSlice: Selector<
  State,
  ReturnType<typeof mailchimpCategoriesSlice.reducer>
> = state => state.email.mailchimpCategories;

export const selectMailchimpCategories: Selector<
  State,
  MailchimpCategory[]
> = createSelector(
  selectMailchimpCategoriesSlice,
  mailchimpCategoriesSlice.selectors.selectAll
);
