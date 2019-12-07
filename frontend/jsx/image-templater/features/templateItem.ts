import { createResourceItemFeature } from '~/redux/features';

import { ImageTemplate } from '../types';

const feature = createResourceItemFeature<ImageTemplate>({
  name: 'image-templater/templateItem',
  endpoint: 'templater',
});

export const loadTemplate = feature.thunks.load;

export const selectTemplate = feature.selectors.select;

export default feature.slice;
