import { Page } from '~/components';

import { NextWagtailPage } from '~/wagtail/types';

import { FaqPageFragment, FaqPageFragmentDoc } from '../fragments.generated';

import EntryListBlock from '../components/EntryListBlock';
import EntryIndexBlock from '../components/EntryIndexBlock';
import SubpagesBlock from '../components/SubpagesBlock';
import FAQPageHeader from '../components/FAQPageHeader';
import NavigationBlock from '../components/NavigationBlock';
import NoEntriesBlock from '../components/NoEntriesBlock';

const FAQPage: NextWagtailPage<FaqPageFragment> = ({ page }) => {
  return (
    <Page title={page.title} description={page.summary}>
      <FAQPageHeader wagtailPage={page} />
      <Page.Main>
        <SubpagesBlock subpages={page.subpages} />
        <EntryIndexBlock entries={page.entries} />
        {page.entries.length ? (
          <EntryListBlock entries={page.entries} />
        ) : !page.subpages.length ? (
          <NoEntriesBlock />
        ) : null}
        <NavigationBlock wagtailPage={page} />
      </Page.Main>
    </Page>
  );
};

FAQPage.fragment = FaqPageFragmentDoc;

export default FAQPage;
