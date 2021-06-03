import '../../fonts.css';

import { Page } from '~/components';
import { NextWagtailPage } from '~/wagtail/types';

import { RatioSectionPageFragment, RatioSectionPageFragmentDoc } from '../fragments.generated';
import Main from './Main';

const SectionPage: NextWagtailPage<RatioSectionPageFragment> = ({ page }) => {
  return (
    <Page title={page.title} chrome="none" menu="team">
      <div className="intro-book mx-auto max-w-3xl">
        <Main {...page} />
      </div>
    </Page>
  );
};

SectionPage.fragment = RatioSectionPageFragmentDoc;

export default SectionPage;
