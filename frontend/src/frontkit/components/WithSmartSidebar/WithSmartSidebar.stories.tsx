import React from 'react';

import { Button } from '../Button';
import { ColumnNav } from '../ColumnNav';
import { WithSmartSidebar } from './index';

export default {
  title: 'Components/WithSmartSidebar',
  component: WithSmartSidebar,
  argTypes: {
    select: { action: 'selected' },
  },
  parameters: {
    layout: 'fullscreen',
  },
};

export const Basic = () => (
  <div style={{ height: '100vh' }}>
    <WithSmartSidebar
      renderSidebar={() => <h1>hello</h1>}
      renderContent={() => <div>Main app content</div>}
    />
  </div>
);

export const WithColumnNav = (args) => (
  <div style={{ height: '100vh' }}>
    <WithSmartSidebar
      renderSidebar={() => (
        <ColumnNav>
          <ColumnNav.Item select={args.select}>Item 1</ColumnNav.Item>
          <ColumnNav.Item select={args.select}>Item 2</ColumnNav.Item>
          <ColumnNav.Item select={args.select} selected>
            Item 3 (active)
          </ColumnNav.Item>
          <ColumnNav.Item select={args.select}>Item 4</ColumnNav.Item>
        </ColumnNav>
      )}
      renderContent={() => (
        <div>
          <div>Main app content</div>
        </div>
      )}
    />
  </div>
);
