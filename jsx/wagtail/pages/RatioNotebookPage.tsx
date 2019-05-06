import React from 'react';

import styled from 'styled-components';

import Page from '../../components/Page';
import { RatioSectionPageType, RatioNotebookPageType } from '../types';
import RatioSectionPage from './RatioSectionPage';

type AuxPages = { [key: number]: RatioSectionPageType }; // copy-pasted from ../any.tsx

interface Props {
  wagtailPage: RatioNotebookPageType;
  ratioSectionPages: AuxPages;
}

const SectionContainer = styled.section`
  break-before: page;
`;

export default function RatioNotebookPage(props: Props) {
  return (
    <Page title={props.wagtailPage.title} noMenu noFooter>
      {props.wagtailPage.sections.map(section => (
        <SectionContainer>
          <RatioSectionPage
            key={section.id}
            {...props.ratioSectionPages[section.value]}
          />
        </SectionContainer>
      ))}
    </Page>
  );
}
