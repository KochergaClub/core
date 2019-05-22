import React from 'react';

import styled from 'styled-components';

import { fonts, colors } from '@kocherga/frontkit';

import { FeatureType } from './types';

const Container = styled.div`
  margin-bottom: 16px;
`;

const Title = styled.div`
  font-size: ${fonts.sizes.XL};
  line-height: 1.2;
`;

const Items = styled.div`
  font-size: ${fonts.sizes.S};
  color: ${colors.grey[800]};
`;

const Feature = (props: FeatureType) => (
  <Container>
    <Title>{props.title}</Title>
    <Items>{props.items.map(item => item.text).join(' · ')}</Items>
  </Container>
);

export default Feature;
