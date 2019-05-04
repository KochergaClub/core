import React from 'react';

import { BlockType } from '../types';

export default function DebugBlock(props: BlockType) {
  return <pre>{JSON.stringify(props, null, 2)}</pre>;
}
