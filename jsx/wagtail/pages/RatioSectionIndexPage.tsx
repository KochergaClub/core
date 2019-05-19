import React from 'react';

import Page from '~/components/Page';

import { StaticProps, staticScreen } from '../types';

import { AnyPageType } from './types';

export interface PageType extends AnyPageType {
  meta_type: 'ratio.SectionIndexPage';
}

const RatioSectionIndexPage = ({ wagtailPage }: StaticProps<PageType>) => {
  return (
    <Page title={wagtailPage.title}>
      <h1>TODO - тут будет список секций</h1>
    </Page>
  );
};

export default staticScreen(RatioSectionIndexPage);
