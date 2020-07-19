import { Page, PaddedBlock } from '~/components';

import { NextWagtailPage } from '~/wagtail/types';

import {
  RatioPresentationIndexPageFragment,
  RatioPresentationIndexPageFragmentDoc,
} from './fragments.generated';
import { A } from '@kocherga/frontkit';

const PresentationIndexPage: NextWagtailPage<RatioPresentationIndexPageFragment> = ({
  page,
}) => {
  return (
    <Page title={page.title} menu="team">
      <Page.Title>{page.title}</Page.Title>
      <PaddedBlock>
        {page.presentations.map(presentation => (
          <div key={presentation.id}>
            <A href={presentation.meta.html_url}>{presentation.title}</A>
          </div>
        ))}
      </PaddedBlock>
    </Page>
  );
};

PresentationIndexPage.fragment = RatioPresentationIndexPageFragmentDoc;

export default PresentationIndexPage;
