import React from 'react';

import styled from 'styled-components';

import { colors, fonts, RichText } from '@kocherga/frontkit';

import { GreyBlockType as Props } from './types';

const Container = styled(RichText)`
  background-color: ${colors.grey[100]};
  padding: 48px 0 40px;
`;

const Header = styled.h2`
  font-size: ${fonts.sizes.XL};
  font-weight: 700;
  text-align: center;
  margin: 0;
  line-height: 1.2;
`;

const Text = styled(RichText)`
  max-width: 800px;
  text-align: center;
  margin: 0 auto;
`;

export default function GreyBlock(block: Props) {
  return (
    <Container>
      <Header>{block.value.header}</Header>
      {block.value.text && (
        <Text dangerouslySetInnerHTML={{ __html: block.value.text }} />
      )}
    </Container>
  );
}
