import { createResourceFeature } from '~/redux/features';

import { ImageTemplate } from '../types';

const feature = createResourceFeature<ImageTemplate>({
  name: 'image-templater/templates',
  endpoint: 'templater',
});

export const loadTemplates = feature.thunks.load;

export const selectTemplates = feature.selectors.asList;

export default feature.slice;
