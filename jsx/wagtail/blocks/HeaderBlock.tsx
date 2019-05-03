import React from 'react';

import styled from 'styled-components';

import { BlockType } from '../types';

interface Props extends BlockType {
  value: string;
}

const Header = styled.h1`
  font-size: 3em;
  line-height: 1.3;
  text-align: center;
`;

const HeaderBlock = (block: Props) => <Header>{block.value}</Header>;

export default HeaderBlock;
