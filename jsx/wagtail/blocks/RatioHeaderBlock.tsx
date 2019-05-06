import React from 'react';

import styled from 'styled-components';

import { RatioHeaderBlockType as Props } from '../types';

const Header = styled.h1`
  font-size: 1.5em;
  line-height: 1.3;
  text-align: left;
  margin-top: 30px;
  break-after: avoid;
`;

export default function RatioHeaderBlock(block: Props) {
  return <Header>{block.value}</Header>;
}
