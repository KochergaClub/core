import React from 'react';

import styled from 'styled-components';

import { Button } from '@kocherga/frontkit';

import ColumnsBlock from '~/components/ColumnsBlock';

import { ColumnsButtonsBlockType as Props } from './types';

const Text = styled.div`
  margin-bottom: 20px;
`;

const ColumnContainer = styled.div`
  margin: 0 auto;
  text-align: center;
`;

const OneColumn = (column: Props['value'][0]) => (
  <div>
    <ColumnContainer>
      <Text>{column.title}</Text>
      <Button onClick={() => window.alert(column.link)}>
        {column.caption}
      </Button>
    </ColumnContainer>
  </div>
);

export default function ColumnsBasicBlock(block: Props) {
  return (
    <ColumnsBlock>
      {block.value.map((column, i) => <OneColumn {...column} key={i} />)}
    </ColumnsBlock>
  );
}
