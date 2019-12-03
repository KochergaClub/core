import { createResourceSlice } from '~/redux/slices/resource';

import { SubscribeChannel, MailchimpCategory } from './types';

export const subscribeChannelsSlice = createResourceSlice<SubscribeChannel>({
  url: 'email/subscribe_channel',
  actionPrefix: '[email] SUBSCRIBE_CHANNEL',
});

export const mailchimpCategoriesSlice = createResourceSlice<MailchimpCategory>({
  url: 'email/mailchimp_category',
  actionPrefix: '[email] MAILCHIMP_CATEGORY',
});
