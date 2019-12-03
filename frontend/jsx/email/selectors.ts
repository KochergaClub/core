import { createSelector, Selector } from 'reselect';

import { State } from '~/redux/store';

import { subscribeChannelsSlice, mailchimpCategoriesSlice } from './slices';
import {
  SubscribeChannel,
  MailchimpCategory,
  MailchimpInterest,
} from './types';

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

export const selectMailchimpInterests: Selector<
  State,
  MailchimpInterest[]
> = createSelector(
  selectMailchimpCategories,
  mailchimpCategories => {
    const mailchimpInterests: MailchimpInterest[] = [];
    for (const mailchimpCategory of mailchimpCategories) {
      for (const mailchimpInterest of mailchimpCategory.interests) {
        mailchimpInterests.push(mailchimpInterest);
      }
    }
    return mailchimpInterests;
  }
);

type MailchimpInterestsDict = { [k: string]: MailchimpInterest };

export const selectMailchimpInterestsDict: Selector<
  State,
  MailchimpInterestsDict
> = createSelector(
  selectMailchimpInterests,
  mailchimpInterests => {
    const mailchimpInterestsDict: MailchimpInterestsDict = {};

    for (const mailchimpInterest of mailchimpInterests) {
      mailchimpInterestsDict[mailchimpInterest.interest_id] = mailchimpInterest;
    }
    return mailchimpInterestsDict;
  }
);
