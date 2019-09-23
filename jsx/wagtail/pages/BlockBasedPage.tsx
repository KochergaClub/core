import React from 'react';

import Page from '~/components/Page';
import { selectAPI } from '~/core/selectors';

import { NextWagtailPage } from '../types';

import { WagtailPageProps } from '../types';
import { BlockType } from '../blocks/types';

import WagtailBlocks, { loadBlockData } from '../WagtailBlocks';

interface BlockBasedPageType extends WagtailPageProps {
  body: BlockType[];
  meta_type: 'pages.FreeFormPage' | 'pages.FrontPage';
}

const BlockBasedPage: NextWagtailPage<BlockBasedPageType> = ({
  wagtailPage,
}) => {
  return (
    <Page title={wagtailPage.title}>
      <WagtailBlocks blocks={wagtailPage.body} />
    </Page>
  );
};

BlockBasedPage.getInitialProps = async ({
  store: { getState },
  wagtailPage,
}) => {
  const api = selectAPI(getState());

  return {
    wagtailPage: {
      ...wagtailPage,
      body: await Promise.all(
        wagtailPage.body.map(block => loadBlockData(block, api))
      ),
    },
  };
};

export default BlockBasedPage;
