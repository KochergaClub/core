import React from 'react';
import styled from 'styled-components';

import Page from '../../components/Page';

import { RatioSectionPageType as Props } from '../types';

import Main from './RatioSectionPage/Main';

const Container = styled.div`
  @font-face {
    font-family: 'Intro Book';
    src: url('/static/fonts/intro-pack/Intro-Book.otf');
  }

  font-family: 'Intro Book';
  max-width: 800px;
  margin: 0 auto;
`;

export default function RatioSectionPage(props: Props) {
  return (
    <Page title={props.title} noMenu noFooter>
      <Container>
        <Main {...props} />
      </Container>
    </Page>
  );
}
