import React from 'react';

import Page from '../../components/Page';
import { WagtailPageType, BlockType } from '../types';
import WagtailBlocks from '../WagtailBlocks';

interface Props extends WagtailPageType {
  body: BlockType[];
}

const HomePage = (props: Props) => {
  return (
    <Page wide title={props.title}>
      <WagtailBlocks blocks={props.body} />
    </Page>
  );
};

export default HomePage;
