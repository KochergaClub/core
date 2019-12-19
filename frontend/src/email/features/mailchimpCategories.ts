import { Selector } from 'reselect';
import { createSelector } from '@reduxjs/toolkit';
import { createResourceFeature } from '~/redux/features';
import { State } from '~/redux/store';

import { MailchimpCategory, MailchimpInterest } from '../types';

const feature = createResourceFeature<MailchimpCategory>({
  name: 'email/mailchimpCategories',
  endpoint: 'email/mailchimp_category',
});

/************** thunks ************/
export const loadMailchimpCategories = feature.thunks.load;

/************** selectors ************/
export const selectMailchimpCategories = feature.selectors.asList;

export const selectMailchimpInterests: Selector<
  State,
  MailchimpInterest[]
> = createSelector(selectMailchimpCategories, mailchimpCategories => {
  const mailchimpInterests: MailchimpInterest[] = [];
  for (const mailchimpCategory of mailchimpCategories) {
    for (const mailchimpInterest of mailchimpCategory.interests) {
      mailchimpInterests.push(mailchimpInterest);
    }
  }
  return mailchimpInterests;
});

type MailchimpInterestsDict = { [k: string]: MailchimpInterest };

export const selectMailchimpInterestsDict: Selector<
  State,
  MailchimpInterestsDict
> = createSelector(selectMailchimpInterests, mailchimpInterests => {
  const mailchimpInterestsDict: MailchimpInterestsDict = {};

  for (const mailchimpInterest of mailchimpInterests) {
    mailchimpInterestsDict[mailchimpInterest.interest_id] = mailchimpInterest;
  }
  return mailchimpInterestsDict;
});

export default feature.slice;
