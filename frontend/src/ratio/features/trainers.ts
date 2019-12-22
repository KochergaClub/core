import { createResourceFeature } from '~/redux/features';

import { Trainer } from '../types';

const feature = createResourceFeature<Trainer>({
  name: 'ratio/trainers',
  endpoint: 'ratio/trainers',
});

export const loadTrainers = feature.thunks.load;

export const selectTrainers = feature.selectors.asList;

export default feature.slice;
