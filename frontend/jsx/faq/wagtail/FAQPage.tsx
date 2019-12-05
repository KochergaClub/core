import Page from '~/components/Page';
import { selectAPI } from '~/core/selectors';

import { NextWagtailPage, WagtailPageProps } from '~/wagtail/types';

import { Entry } from '../types';
import EntryListBlock from '../components/EntryListBlock';
import EntryIndexBlock from '../components/EntryIndexBlock';
import SubpagesBlock from '../components/SubpagesBlock';
import FAQPageHeader from '../components/FAQPageHeader';
import NavigationBlock from '../components/NavigationBlock';

export interface PageType extends WagtailPageProps {
  meta_type: 'faq.FAQPage';
  summary?: string;
  prev_page?: WagtailPageProps;
  next_page?: WagtailPageProps;
}

export interface ExtraProps {
  entries: Entry[];
  subpages: PageType[];
}

const FAQPage: NextWagtailPage<PageType, ExtraProps> = props => {
  return (
    <Page title={props.wagtailPage.title}>
      <FAQPageHeader wagtailPage={props.wagtailPage} />
      <Page.Main>
        <SubpagesBlock subpages={props.subpages} />
        <EntryIndexBlock entries={props.entries} />
        <EntryListBlock entries={props.entries} />
        <NavigationBlock wagtailPage={props.wagtailPage} />
      </Page.Main>
    </Page>
  );
};

FAQPage.getInitialProps = async ({ store: { getState }, wagtailPage }) => {
  const api = selectAPI(getState());

  const entries = (await api.call(
    `faq/entry?page_id=${wagtailPage.id}`,
    'GET'
  )) as Entry[];

  const subpages = (
    await api.callWagtail(
      `pages/?child_of=${wagtailPage.id}&type=faq.FAQPage&fields=summary`
    )
  ).items as PageType[];

  for (const subpage of subpages) {
    subpage.meta_type = 'faq.FAQPage'; // TODO - move to common function
  }

  return { entries, subpages };
};

export default FAQPage;
