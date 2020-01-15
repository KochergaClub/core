import { Page, PaddedBlock } from '~/components';

import PageHeader from '~/blocks/PageHeader';

import { NextWagtailPage } from '~/wagtail/types';

import {
  BlogIndexPageFragment,
  BlogIndexPageFragmentDoc,
  BlogPostPage_SummaryFragment,
} from '../fragments.generated';

import Summary from './Summary';

const BlogIndexPage: NextWagtailPage<BlogIndexPageFragment> = ({ page }) => {
  return (
    <Page title={page.title} description={page.subtitle}>
      <PageHeader title={page.title} bottom={page.subtitle} />
      <Page.Main>
        <PaddedBlock width="small">
          {page.posts.map((summary, i) => (
            <Summary key={i} {...summary} />
          ))}
        </PaddedBlock>
      </Page.Main>
    </Page>
  );
};

BlogIndexPage.fragment = BlogIndexPageFragmentDoc;

export default BlogIndexPage;
