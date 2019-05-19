import React from 'react';

import Page from '~/components/Page';

import { staticScreen, StaticProps } from '../types';

import { AnyPageType } from './types';
import { BlockType } from '../blocks/types';

import WagtailBlocks from '../WagtailBlocks';

interface PageType extends AnyPageType {
  body: BlockType[];
  meta_type: 'pages.FreeFormPage';
}

const FreeFormPage = ({ wagtailPage }: StaticProps<PageType>) => {
  return (
    <Page title={wagtailPage.title}>
      <WagtailBlocks blocks={wagtailPage.body} />
    </Page>
  );
};

export default staticScreen(FreeFormPage);
