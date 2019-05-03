import React from 'react';

import styled from 'styled-components';

import { BlockType } from '../types';

interface Props extends BlockType {
  value: {
    header: string;
    text?: string;
  };
}

const Container = styled.div`
  background-color: #eee;
  padding: 20px 0;
`;

const Header = styled.h2`
  font-size: 2em;
  text-align: center;
`;

const Text = styled.div``;

const GreyBlock = (block: Props) => {
  return (
    <Container>
      <Header>{block.value.header}</Header>
      {block.value.text && (
        <Text dangerouslySetInnerHTML={{ __html: block.value.text }} />
      )}
    </Container>
  );
};

export default GreyBlock;
