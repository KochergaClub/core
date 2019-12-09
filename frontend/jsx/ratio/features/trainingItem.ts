import { createResourceItemFeature } from '~/redux/features';

import { Training } from '../types';

const feature = createResourceItemFeature<Training>({
  name: 'ratio/trainingItem',
  endpoint: 'ratio/training',
});

export const loadTraining = feature.thunks.load;

export const selectTraining = feature.selectors.select;

export default feature.slice;
