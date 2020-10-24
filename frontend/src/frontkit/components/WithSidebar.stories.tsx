import React from 'react';

import { ColumnNav } from './ColumnNav';
import { WithSidebar } from './WithSidebar';

export default {
  title: "Components/WithSidebar",
  component: WithSidebar,
  argTypes: {
    select: { action: "selected" },
  },
};

export const Basic = () => (
  <WithSidebar sidebar={<h1>hello</h1>}>Main app content</WithSidebar>
);

export const WithColumnNav = (args) => (
  <WithSidebar
    sidebar={
      <ColumnNav>
        <ColumnNav.Item select={args.select}>Item 1</ColumnNav.Item>
        <ColumnNav.Item select={args.select}>Item 2</ColumnNav.Item>
        <ColumnNav.Item select={args.select} selected>
          Item 3 (active)
        </ColumnNav.Item>
        <ColumnNav.Item select={args.select}>Item 4</ColumnNav.Item>
      </ColumnNav>
    }
  >
    Main app content
  </WithSidebar>
);
