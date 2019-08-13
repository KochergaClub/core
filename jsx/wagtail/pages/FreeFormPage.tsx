import React from 'react';

import Page from '~/components/Page';

import { NextWagtailPage } from '../types';

import { AnyPageType } from './types';
import { BlockType } from '../blocks/types';

import WagtailBlocks from '../WagtailBlocks';

interface PageType extends AnyPageType {
  body: BlockType[];
  meta_type: 'pages.FreeFormPage';
}

const FreeFormPage: NextWagtailPage<PageType> = ({ wagtailPage }) => {
  return (
    <Page title={wagtailPage.title}>
      <WagtailBlocks blocks={wagtailPage.body} />
    </Page>
  );
};

export default FreeFormPage;
