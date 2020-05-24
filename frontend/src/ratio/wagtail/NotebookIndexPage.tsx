import { Page } from '~/components';

import { NextWagtailPage } from '~/wagtail/types';

import {
  RatioNotebookIndexPageFragment,
  RatioNotebookIndexPageFragmentDoc,
} from './fragments.generated';

const SectionIndexPage: NextWagtailPage<RatioNotebookIndexPageFragment> = ({
  page,
}) => {
  return (
    <Page title={page.title} menu="team">
      <h1>TODO - тут будет список рабочих тетрадей</h1>
    </Page>
  );
};

SectionIndexPage.fragment = RatioNotebookIndexPageFragmentDoc;

export default SectionIndexPage;
