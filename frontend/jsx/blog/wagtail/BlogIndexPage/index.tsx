import Page from '~/components/Page';
import PaddedBlock from '~/components/PaddedBlock';
import { selectAPI } from '~/core/selectors';

import PageHeader from '~/blocks/PageHeader';

import { NextWagtailPage } from '~/wagtail/types';

import { WagtailPageProps } from '~/wagtail/types';

import { BlogPostSummary } from './types';

import Summary from './Summary';

export interface PageType extends WagtailPageProps {
  meta_type: 'blog.BlogIndexPage';
  subtitle: string;
}

export interface ExtraProps {
  postSummaries: BlogPostSummary[];
}

const BlogIndexPage: NextWagtailPage<PageType, ExtraProps> = props => {
  return (
    <Page title={props.wagtailPage.title}>
      <PageHeader
        title={props.wagtailPage.title}
        bottom={props.wagtailPage.subtitle}
      />
      <Page.Main>
        <PaddedBlock width="small">
          {props.postSummaries.map((summary, i) => (
            <Summary key={i} {...summary} />
          ))}
        </PaddedBlock>
      </Page.Main>
    </Page>
  );
};

BlogIndexPage.getInitialProps = async ({
  store: { getState },
  wagtailPage,
}) => {
  const api = selectAPI(getState());

  const json = await api.callWagtail(
    `pages/?type=blog.BlogPostPage&fields=date,summary&child_of=${wagtailPage.id}&order=-date`
  );

  const summaries = json['items'] as BlogPostSummary[];

  const props: ExtraProps = {
    postSummaries: summaries,
  };
  return props;
};

export default BlogIndexPage;
