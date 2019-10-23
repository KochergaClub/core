import React from 'react';

import { Column } from '@kocherga/frontkit';

import { AnyViewProps as Props } from './types';

function ListView<I>(props: Props<I>) {
  return (
    <Column stretch>{props.items.map(item => props.renderItem(item))}</Column>
  );
}

export default ListView;
