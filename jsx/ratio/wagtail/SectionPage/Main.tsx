import React from 'react';
import styled from 'styled-components';

import { SectionPageType as Props } from '../types';

import WagtailBlocks from '~/wagtail/WagtailBlocks';

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
