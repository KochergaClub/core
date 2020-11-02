import React from 'react';

import { ResponsivePadding } from './ResponsivePadding';

export default {
  title: "Layout/ResponsivePadding",
  component: ResponsivePadding,
};

export const Basic = () => (
  <div style={{ border: "1px solid black" }}>
    <ResponsivePadding>
      <div style={{ backgroundColor: "#ddd" }}>Содержимое</div>
    </ResponsivePadding>
  </div>
);
