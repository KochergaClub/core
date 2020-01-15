import styled from 'styled-components';

import { Page } from '~/components';

import { NextWagtailPage } from '~/wagtail/types';

import RatioSection_Main from '../SectionPage/Main';

import {
  RatioNotebookPageFragment,
  RatioNotebookPageFragmentDoc,
} from '../fragments.generated';

import SectionTOC from './SectionTOC';
import PrintDocument from './PrintDocument';
import Frontpage from './Frontpage';
import Emptypage from './Emptypage';
import PrintFooter from './PrintFooter';

const SectionContainer = styled.section`
  break-before: page;
`;

const NotebookPage: NextWagtailPage<RatioNotebookPageFragment> = ({ page }) => {
  const footer = <PrintFooter />;
  return (
    <Page title={page.title} chrome="none" team>
      <PrintDocument footer={footer}>
        <Frontpage wagtailPage={page} />
        <Emptypage />
        <SectionTOC page={page} />
        <Emptypage />
        <div>
          {page.sections.map(section => {
            return (
              <SectionContainer key={section.id}>
                <a id={`section-${section.value.meta.slug}`} />
                <RatioSection_Main {...section.value} />
              </SectionContainer>
            );
          })}
        </div>
      </PrintDocument>
    </Page>
  );
};

NotebookPage.fragment = RatioNotebookPageFragmentDoc;

export default NotebookPage;
