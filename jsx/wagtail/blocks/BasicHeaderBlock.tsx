import React from 'react';

import styled from 'styled-components';

import { BasicHeaderBlockType as Props } from './types';

const Header = styled.h1`
  font-size: 3em;
  line-height: 1.3;
  text-align: center;
`;

export default function HeaderBlock(block: Props) {
  return <Header>{block.value}</Header>;
}
