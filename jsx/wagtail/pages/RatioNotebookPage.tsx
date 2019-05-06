import React from 'react';

import styled from 'styled-components';

import Page from '../../components/Page';
import { RatioSectionPageType, RatioNotebookPageType } from '../types';
import RatioSectionPage from './RatioSectionPage';

import SectionTOC from './RatioNotebookPage/SectionTOC';
import Frontpage from './RatioNotebookPage/Frontpage';

type AuxPages = { [key: number]: RatioSectionPageType }; // copy-pasted from ../any.tsx

export interface Props {
  wagtailPage: RatioNotebookPageType;
  ratioSectionPages: AuxPages;
}

const SectionContainer = styled.section`
  break-before: page;
`;

const Background = styled.div`
  background-color: #eee;
`;

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  background-color: white;
  @media screen {
    max-width: 840px;
    padding: 0 20px;
  }

  @media print {
    font-size: 0.9em;
  }
`;

export default function RatioNotebookPage(props: Props) {
  return (
    <Page title={props.wagtailPage.title} noMenu noFooter wide>
      <Background>
        <Container>
          <Frontpage />
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
        </Container>
      </Background>
    </Page>
  );
}
