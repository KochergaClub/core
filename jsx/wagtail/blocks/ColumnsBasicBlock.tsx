import React from 'react';

import styled from 'styled-components';

import { fonts, RichText } from '@kocherga/frontkit';

import ColumnsBlock from '~/components/ColumnsBlock';

import { ColumnsBasicBlockType as Props } from './types';

const Header = styled.h2`
  font-size: ${fonts.sizes.L};
  text-align: center;
`;

const Text = styled(RichText)``;

const OneColumn = (column: Props['value'][0]) => (
  <div>
    <Header>{column.header}</Header>
    {column.text && <Text dangerouslySetInnerHTML={{ __html: column.text }} />}
  </div>
);

export default function ColumnsBasicBlock(block: Props) {
  return (
    <ColumnsBlock>
      {block.value.map((column, i) => (
        <OneColumn {...column} key={i} />
      ))}
    </ColumnsBlock>
  );
}
