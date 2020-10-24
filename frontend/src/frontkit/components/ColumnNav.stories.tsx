import React from 'react';

import { ColumnNav } from './ColumnNav';

export default {
  title: "Components/ColumnNav",
  component: ColumnNav,
  argTypes: {
    select: { action: "selected" },
  },
};

export const Basic = (args) => (
  <ColumnNav>
    <ColumnNav.Item select={args.select}>Item 1</ColumnNav.Item>
    <ColumnNav.Item selected select={args.select}>
      Item 2
    </ColumnNav.Item>
    <ColumnNav.Item select={args.select}>Item 3</ColumnNav.Item>
  </ColumnNav>
);
