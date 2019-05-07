import React from 'react';

import styled from 'styled-components';

import Page from '../../components/Page';
import { RatioSectionPageType, RatioNotebookPageType } from '../types';
import RatioSection_Main from './RatioSectionPage/Main';

import SectionTOC from './RatioNotebookPage/SectionTOC';
import PrintDocument from './RatioNotebookPage/PrintDocument';
import Frontpage from './RatioNotebookPage/Frontpage';
import PrintFooter from './RatioNotebookPage/PrintFooter';

type AuxPages = { [key: number]: RatioSectionPageType }; // copy-pasted from ../any.tsx

export interface Props {
  wagtailPage: RatioNotebookPageType;
  ratioSectionPages: AuxPages;
}

const SectionContainer = styled.section`
  break-before: page;
`;

export default function RatioNotebookPage(props: Props) {
  const footer = <PrintFooter />;
  return (
    <Page title={props.wagtailPage.title} noMenu noFooter wide>
      <PrintDocument footer={footer}>
        <Frontpage />
        <SectionTOC {...props} />
        <div>
          {props.wagtailPage.sections.map(section => {
            const sectionPage = props.ratioSectionPages[section.value];
            return (
              <SectionContainer key={section.id}>
                <a id={`section-${sectionPage.meta.slug}`} />
                <RatioSection_Main {...sectionPage} />
              </SectionContainer>
            );
          })}
        </div>
      </PrintDocument>
    </Page>
  );
}
