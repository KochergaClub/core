import React from 'react';

import { Column } from '../layout/Column';
import { Badge } from './Badge';

const hideStyledArgs = {
  ref: { table: { disable: true } },
  theme: { table: { disable: true } },
  as: { table: { disable: true } },
  forwardedAs: { table: { disable: true } },
};

export default {
  title: "Components/Badge",
  component: Badge,
  argTypes: {
    ...hideStyledArgs,
  },
};

export const Basic = (args) => <Badge {...args}>Текст</Badge>;

export const All = (args) => (
  <Column>
    <Badge {...args}>Текст</Badge>
    <Badge {...args} type="accent">
      Текст
    </Badge>
  </Column>
);
