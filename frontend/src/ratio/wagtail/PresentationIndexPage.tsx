import { A } from '~/frontkit';

import { PaddedBlock, Page } from '~/components';
import { NextWagtailPage } from '~/wagtail/types';

import {
    RatioPresentationIndexPageFragment, RatioPresentationIndexPageFragmentDoc
} from './fragments.generated';

const PresentationIndexPage: NextWagtailPage<RatioPresentationIndexPageFragment> = ({
  page,
}) => {
  return (
    <Page title={page.title} menu="team">
      <Page.Title>{page.title}</Page.Title>
      <PaddedBlock>
        {page.presentations.map((presentation) => (
          <div key={presentation.id}>
            <A href={presentation.meta.url}>{presentation.title}</A>
          </div>
        ))}
      </PaddedBlock>
    </Page>
  );
};

PresentationIndexPage.fragment = RatioPresentationIndexPageFragmentDoc;

export default PresentationIndexPage;
