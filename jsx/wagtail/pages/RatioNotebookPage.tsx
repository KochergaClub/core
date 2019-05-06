import React from 'react';

import styled from 'styled-components';

import Page from '../../components/Page';
import { RatioSectionPageType, RatioNotebookPageType } from '../types';
import RatioSectionPage from './RatioSectionPage';

import SectionTOC from './RatioNotebookPage/SectionTOC';

type AuxPages = { [key: number]: RatioSectionPageType }; // copy-pasted from ../any.tsx

export interface Props {
  wagtailPage: RatioNotebookPageType;
  ratioSectionPages: AuxPages;
}

const SectionContainer = styled.section`
  break-before: page;
`;

export default function RatioNotebookPage(props: Props) {
  return (
    <Page title={props.wagtailPage.title} noMenu noFooter>
      <SectionTOC {...props} />
      <div>
        {props.wagtailPage.sections.map(section => {
          const sectionPage = props.ratioSectionPages[section.value];
          return (
            <SectionContainer key={section.id}>
              <a id={`section-${sectionPage.meta.slug}`} />
              <RatioSectionPage {...sectionPage} />
            </SectionContainer>
          );
        })}
      </div>
    </Page>
  );
}
