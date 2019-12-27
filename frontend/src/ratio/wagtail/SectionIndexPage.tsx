import React from 'react';

import Page from '~/components/Page';

import { NextWagtailPage } from '~/wagtail/types';

import { WagtailPageProps } from '~/wagtail/types';

export interface PageType extends WagtailPageProps {
  meta_type: 'ratio.SectionIndexPage';
}

const SectionIndexPage: NextWagtailPage<PageType> = ({ wagtailPage }) => {
  return (
    <Page title={wagtailPage.title} team>
      <h1>TODO - тут будет список секций</h1>
    </Page>
  );
};

export default SectionIndexPage;
