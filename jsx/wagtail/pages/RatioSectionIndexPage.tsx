import React from 'react';

import Page from '~/components/Page';

import { NextWagtailPage } from '../types';

import { AnyPageType } from './types';

export interface PageType extends AnyPageType {
  meta_type: 'ratio.SectionIndexPage';
}

const RatioSectionIndexPage: NextWagtailPage<PageType> = ({ wagtailPage }) => {
  return (
    <Page title={wagtailPage.title} team>
      <h1>TODO - тут будет список секций</h1>
    </Page>
  );
};

export default RatioSectionIndexPage;
