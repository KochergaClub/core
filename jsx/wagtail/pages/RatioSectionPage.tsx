import React from 'react';

import styled from 'styled-components';

import Page from '../../components/Page';
import { RatioSectionPageType as Props } from '../types';

import WagtailBlocks from '../WagtailBlocks';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const Header = styled.h1`
  text-align: center;
  text-decoration: underline;
`;

export default function RatioSectionPage(props: Props) {
  return (
    <Page title={props.title} noMenu noFooter>
      <Container>
        <Header>{props.title}</Header>
        <WagtailBlocks blocks={props.body} />
      </Container>
    </Page>
  );
}
