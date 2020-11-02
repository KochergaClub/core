import React from 'react';

import { RowNav } from './RowNav';

export default {
  title: "Components/RowNav",
  component: RowNav,
  argTypes: {
    select: { action: "selected" },
  },
};

export const Basic = (args) => (
  <RowNav>
    <RowNav.Item select={args.select}>Item 1</RowNav.Item>
    <RowNav.Item select={args.select} selected>
      Item 2
    </RowNav.Item>
    <RowNav.Item select={args.select}>Item 3</RowNav.Item>
  </RowNav>
);
