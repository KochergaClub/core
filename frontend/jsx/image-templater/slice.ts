import { createResourceSlice } from '~/redux/slices-old/resource';

import { ImageTemplate } from './types';

export default createResourceSlice<ImageTemplate>({
  url: 'templater',
  actionPrefix: '[image-templater] TEMPLATE',
  getId: item => item.name,
});
