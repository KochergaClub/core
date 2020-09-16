import { Page } from '~/components';
import { NextWagtailPage } from '~/wagtail/types';

import {
    RatioSectionIndexPageFragment, RatioSectionIndexPageFragmentDoc
} from './fragments.generated';

const SectionIndexPage: NextWagtailPage<RatioSectionIndexPageFragment> = ({
  page,
}) => {
  return (
    <Page title={page.title} menu="team">
      <h1>TODO - тут будет список секций</h1>
    </Page>
  );
};

SectionIndexPage.fragment = RatioSectionIndexPageFragmentDoc;

export default SectionIndexPage;
