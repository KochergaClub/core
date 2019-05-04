import React from 'react';

import Page from '../../components/Page';
import { FreeFormPageType as Props } from '../types';
import WagtailBlocks from '../WagtailBlocks';

export default function FreeFormPage(props: Props) {
  return (
    <Page wide title={props.title}>
      <WagtailBlocks blocks={props.body} />
    </Page>
  );
}
