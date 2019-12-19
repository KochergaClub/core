import { createResourceBagFeature } from '~/redux/features';

import { Training } from '../types';

export const trainingBagFeature = createResourceBagFeature<Training>({
  name: 'ratio/trainingBag',
  endpoint: 'ratio/training',
  paged: true,
});

export default trainingBagFeature.slice;
