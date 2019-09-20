import React from 'react';

import styled from 'styled-components';

import Page from '~/components/Page';
import { selectAPI } from '~/core/selectors';

import { NextWagtailPage } from '~/wagtail/types';

import { AnyPageType } from '~/wagtail/pages/types';
import { AnyBlockType } from '~/wagtail/blocks/types';
import { PageType as SectionPageType } from '../SectionPage';
import RatioSection_Main from '../SectionPage/Main';

import SectionTOC from './SectionTOC';
import PrintDocument from './PrintDocument';
import Frontpage from './Frontpage';
import Emptypage from './Emptypage';
import PrintFooter from './PrintFooter';

interface AuxPages {
  [key: number]: SectionPageType;
}

interface NotebookBlockType extends AnyBlockType {
  type: 'ratio_notebook_section';
  value: number;
}

export interface PageType extends AnyPageType {
  meta_type: 'ratio.NotebookPage';
  sections: NotebookBlockType[];
}

export interface ExtraProps {
  ratioSectionPages: AuxPages;
}

const SectionContainer = styled.section`
  break-before: page;
`;

const NotebookPage: NextWagtailPage<PageType, ExtraProps> = props => {
  const footer = <PrintFooter />;
  return (
    <Page title={props.wagtailPage.title} noMenu noFooter team>
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

NotebookPage.getInitialProps = async ({ store: { getState }, wagtailPage }) => {
  const api = selectAPI(getState());

  const ids = wagtailPage.sections.map(section => section.value);

  const sectionPages: AuxPages = {};
  for (const id of ids) {
    const sectionPage = await api.callWagtail(`pages/${id}/?fields=*`);
    sectionPages[id] = sectionPage;
  }

  const props: ExtraProps = {
    ratioSectionPages: sectionPages,
  };
  return props;
};

export default NotebookPage;
