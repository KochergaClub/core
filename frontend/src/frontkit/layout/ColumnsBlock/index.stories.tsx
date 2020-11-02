import React from 'react';

import { ColumnsBlock } from './index';

export default {
  title: "Layout/ColumnsBlock",
  component: ColumnsBlock,
};

export const Basic = () => (
  <ColumnsBlock>
    <div style={{ backgroundColor: "#ddd" }}>Колонка 1</div>
    <div style={{ backgroundColor: "#ddd" }}>Колонка 2</div>
    <div style={{ backgroundColor: "#ddd" }}>Колонка 3</div>
  </ColumnsBlock>
);

export const CustomSpaces = () => (
  <ColumnsBlock
    spaces={{
      mobile: { gap: 3, direction: "horizontal" },
      tablet: { gap: 10, direction: "horizontal" },
      laptop: { gap: 10, direction: "horizontal" },
      desktop: { gap: 10, direction: "horizontal" },
    }}
  >
    <div style={{ backgroundColor: "#ddd" }}>Колонка 1</div>
    <div style={{ backgroundColor: "#ddd" }}>Колонка 2</div>
    <div style={{ backgroundColor: "#ddd" }}>Колонка 3</div>
  </ColumnsBlock>
);
