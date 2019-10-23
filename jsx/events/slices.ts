import { createListSlice } from '~/redux/slices/list';

import { Feedback } from './types';

export const feedbacksSlice = createListSlice<Feedback>({
  actionPrefix: '[events] FEEDBACK',
});
