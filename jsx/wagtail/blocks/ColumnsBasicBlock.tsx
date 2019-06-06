import React from 'react';

import styled from 'styled-components';

import { RichText, Row } from '@kocherga/frontkit';
import { ColumnsBasicBlockType as Props } from './types';

const Header = styled.h2`
  font-size: 1.3em;
  text-align: center;
`;

const OneColumn = (column: Props['value'][0]) => (
  <div>
    <Header>{column.header}</Header>
    {column.text && (
      <RichText dangerouslySetInnerHTML={{ __html: column.text }} />
    )}
  </div>
);

export default function ColumnsBasicBlock(block: Props) {
  return (
    <Row>
      {block.value.map((column, i) => (
        <OneColumn {...column} key={i} />
      ))}
    </Row>
  );
}
