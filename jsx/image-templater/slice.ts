import { createResourceSlice } from '~/redux/slices/resource';

import { ImageTemplate } from './types';

export default createResourceSlice<ImageTemplate>({
  url: 'templater',
  actionPrefix: '[image-templater] TEMPLATE',
  getId: item => item.name,
});
