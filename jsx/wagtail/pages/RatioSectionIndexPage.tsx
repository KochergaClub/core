import React from 'react';

import Page from '../../components/Page';
import { RatioSectionIndexPageType as Props } from '../types';

export default function FreeFormPage(props: Props) {
  return (
    <Page title={props.title}>
      <h1>TODO - тут будет список секций</h1>
    </Page>
  );
}
