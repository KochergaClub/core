import { createResourceFeature } from '~/redux/features';

import { Grade } from '../types';

const feature = createResourceFeature<Grade>({
  name: 'watchmen/grades',
  endpoint: 'watchmen/grades',
});

export const selectGrades = feature.selectors.asList;

export const loadGrades = feature.thunks.load;

export default feature.slice;
