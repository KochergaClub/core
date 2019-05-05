import React from 'react';

import Page from '../../components/Page';
import { RatioSectionPageType, RatioNotebookPageType } from '../types';
import RatioSectionPage from './RatioSectionPage';

interface Props {
  wagtailPage: RatioNotebookPageType;
  ratioSectionPages: RatioSectionPageType[];
}

export default function RatioNotebookPage(props: Props) {
  return (
    <Page title={props.wagtailPage.title} noMenu noFooter>
      {props.ratioSectionPages.map(sectionPage => (
        <RatioSectionPage key={sectionPage.id} {...sectionPage} />
      ))}
    </Page>
  );
}
