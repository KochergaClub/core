import React from 'react';

import styled from 'styled-components';

import Page from '~/components/Page';
import { API } from '~/common/api';

import { dynamicScreen } from '../../types';

import { AnyPageType } from '../types';
import { AnyBlockType } from '../../blocks/types';
import { PageType as RatioSectionPageType } from '../RatioSectionPage';
import RatioSection_Main from '../RatioSectionPage/Main';

import SectionTOC from './SectionTOC';
import PrintDocument from './PrintDocument';
import Frontpage from './Frontpage';
import Emptypage from './Emptypage';
import PrintFooter from './PrintFooter';

interface AuxPages {
  [key: number]: RatioSectionPageType;
}

interface NotebookBlockType extends AnyBlockType {
  type: 'ratio_notebook_section';
  value: number;
}

export interface PageType extends AnyPageType {
  meta_type: 'ratio.NotebookPage';
  sections: NotebookBlockType[];
}

export interface Props {
  wagtailPage: PageType;
  ratioSectionPages: AuxPages;
}

const SectionContainer = styled.section`
  break-before: page;
`;

const RatioNotebookPage = (props: Props) => {
  const footer = <PrintFooter />;
  return (
    <Page title={props.wagtailPage.title} noMenu noFooter>
      <PrintDocument footer={footer}>
        <Frontpage wagtailPage={props.wagtailPage} />
        <Emptypage />
        <SectionTOC {...props} />
        <Emptypage />
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
};

export default dynamicScreen(
  RatioNotebookPage,
  async ({ api }: { api: API }, wagtailPage: PageType) => {
    const ids = wagtailPage.sections.map(section => section.value);

    const sectionPages: AuxPages = {};
    for (const id of ids) {
      const sectionPage = await api.callWagtail(`pages/${id}/?fields=*`);
      sectionPages[id] = sectionPage;
    }

    const props: Props = {
      wagtailPage,
      ratioSectionPages: sectionPages,
    };
    return props;
  }
);
