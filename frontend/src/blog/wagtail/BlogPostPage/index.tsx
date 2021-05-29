import { parseISO } from 'date-fns';

import { ItemPageHeader } from '~/blocks/ItemPageHeader';
import { formatDate } from '~/common/utils';
import { Page } from '~/components';
import { RichText } from '~/frontkit';
import { NextWagtailPage } from '~/wagtail/types';

import {
    BlogPostAuthorFragment, BlogPostPageFragment, BlogPostPageFragmentDoc
} from '../fragments.generated';
import { Author } from './Author';

const AuthorsList = ({ authors }: { authors: BlogPostAuthorFragment[] }) => {
  return (
    <div className="m-4 space-y-8">
      {authors.map((author, i) => (
        <Author key={i} {...author} />
      ))}
    </div>
  );
};

const TextWithAuthors = ({
  text,
  authors,
}: {
  text: string;
  authors: BlogPostAuthorFragment[];
}) => {
  return (
    <div className="flex flex-wrap justify-center my-10">
      <RichText
        className="max-w-2xl px-5 mb-10"
        dangerouslySetInnerHTML={{ __html: text }}
      />
      <AuthorsList authors={authors} />
    </div>
  );
};

const BlogPostPage: NextWagtailPage<BlogPostPageFragment> = ({ page }) => {
  return (
    <Page title={page.title} description={page.summary}>
      <ItemPageHeader
        title={page.title}
        sectionTitle="Блог Кочерги"
        sectionLink="/blog"
      >
        <div className="text-gray-400">
          {formatDate(parseISO(page.date), 'd MMMM yyyy')}
        </div>
      </ItemPageHeader>
      <TextWithAuthors text={page.body} authors={page.authors} />
    </Page>
  );
};

BlogPostPage.fragment = BlogPostPageFragmentDoc;

export default BlogPostPage;
