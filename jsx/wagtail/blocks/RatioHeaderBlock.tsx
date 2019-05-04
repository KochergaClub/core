import React from 'react';

import styled from 'styled-components';

import { RatioHeaderBlockType as Props } from '../types';

const Header = styled.h1`
  font-size: 1.6em;
  line-height: 1.3;
  text-align: center;
`;

export default function RatioHeaderBlock(block: Props) {
  return <Header>{block.value}</Header>;
}
