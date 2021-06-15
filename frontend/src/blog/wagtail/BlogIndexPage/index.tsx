import { PageHeader } from '~/blocks/PageHeader';
import { PaddedBlock, Page } from '~/components';
import { NextWagtailPage } from '~/wagtail/types';

import { BlogIndexPageFragment, BlogIndexPageFragmentDoc } from '../fragments.generated';
import Summary from './Summary';

const BlogIndexPage: NextWagtailPage<BlogIndexPageFragment> = ({ page }) => {
  return (
    <Page title={page.title} description={page.subtitle}>
      <PageHeader title={page.title} bottom={page.subtitle} />
      <Page.Main>
        <PaddedBlock width="small">
          <div className="space-y-10">
            {page.posts.map((summary, i) => (
              <Summary key={i} {...summary} />
            ))}
          </div>
        </PaddedBlock>
      </Page.Main>
    </Page>
  );
};

BlogIndexPage.fragment = BlogIndexPageFragmentDoc;

export default BlogIndexPage;
