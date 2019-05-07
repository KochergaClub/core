import React from 'react';
import styled from 'styled-components';

import { RatioSectionPageType as Props } from '../../types';

import WagtailBlocks from '../../WagtailBlocks';

const Header = styled.h1`
  text-align: center;
`;

export default function Main(props: Props) {
  return (
    <div>
      <Header>{props.title}</Header>
      <WagtailBlocks blocks={props.body} />
    </div>
  );
}
