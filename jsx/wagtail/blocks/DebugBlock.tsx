import React from 'react';

import { BlockType } from '../types';

export default (props: BlockType) => (
  <pre>{JSON.stringify(props, null, 2)}</pre>
);
