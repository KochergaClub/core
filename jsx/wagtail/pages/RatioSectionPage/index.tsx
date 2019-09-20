import React from 'react';
import styled from 'styled-components';

import Page from '~/components/Page';

import { NextWagtailPage } from '../../types';

import { BlockType } from '../../blocks/types';
import { AnyPageType } from '../types';

import Main from './Main';

const Container = styled.div`
  @font-face {
    font-family: 'Intro Book';
    src: url('/static/fonts/intro-pack/Intro-Book.otf');
  }

  font-family: 'Intro Book';
  max-width: 800px;
  margin: 0 auto;
`;

export interface PageType extends AnyPageType {
  meta_type: 'ratio.SectionPage';
  body: BlockType[];
}

const RatioSectionPage: NextWagtailPage<PageType> = ({ wagtailPage }) => {
  return (
    <Page title={wagtailPage.title} noMenu noFooter team>
      <Container>
        <Main {...wagtailPage} />
      </Container>
    </Page>
  );
};

export default RatioSectionPage;
